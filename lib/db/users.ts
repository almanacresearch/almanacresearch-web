import { supabase } from "@/lib/supabaseClient";
import { encrypt, decrypt } from "@/lib/auth/encryption";
import type { UserDB } from "@/lib/auth/types";

export type { UserDB };

export type AuthProvider = "google"; // extendable for other providers
export type OAuthProvider = "google_gmail";

const authToOAuthProvider: Record<AuthProvider, OAuthProvider> = {
  google: "google_gmail",
};

export interface AuthIdentity {
  provider: AuthProvider;
  provider_user_id: string;
  email: string | undefined;
}

export interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  scopes?: string[];
  expiry?: Date;
}

export async function findOrCreateUser(
  identity: AuthIdentity,
  profile: { name: string; picture?: string },
  tokens: OAuthTokens
): Promise<{ user: UserDB; isNewUser: boolean }> {
  const { data: existingIdentity } = await supabase
    .from("auth_identities")
    .select("user_id")
    .eq("provider", identity.provider)
    .eq("provider_user_id", identity.provider_user_id)
    .single();

  if (existingIdentity) {
    const now = new Date().toISOString();
    const { data: user, error: userError } = await supabase
      .from("users")
      .update({
        name: profile.name,
        picture: profile.picture,
        last_active: now,
        updated_at: now,
      })
      .eq("id", existingIdentity.user_id)
      .select()
      .single();

    if (userError) {
      throw new Error("user_update_failed");
    }

    await upsertOAuthTokens(
      existingIdentity.user_id,
      identity.provider,
      tokens
    );

    return { user, isNewUser: false };
  }

  if (identity.email) {
    const { data: existingUserByEmail } = await supabase
      .from("users")
      .select("*")
      .eq("primary_email", identity.email)
      .single();

    if (existingUserByEmail) {
      await createAuthIdentity(existingUserByEmail.id, identity);
      await upsertOAuthTokens(
        existingUserByEmail.id,
        identity.provider,
        tokens
      );

      const now = new Date().toISOString();
      await supabase
        .from("users")
        .update({
          last_active: now,
          updated_at: now,
        })
        .eq("id", existingUserByEmail.id);

      return { user: existingUserByEmail, isNewUser: false };
    }
  }

  const { data: newUser, error: createError } = await supabase
    .from("users")
    .insert({
      primary_email: identity.email,
      name: profile.name,
      picture: profile.picture,
      status: "ACTIVE",
      invited: false,
    })
    .select()
    .single();

  if (createError) {
    throw new Error("user_creation_failed");
  }

  await createAuthIdentity(newUser.id, identity);

  await upsertOAuthTokens(newUser.id, identity.provider, tokens);

  return { user: newUser, isNewUser: true };
}

async function createAuthIdentity(
  userId: string,
  identity: AuthIdentity
): Promise<void> {
  const { error } = await supabase.from("auth_identities").insert({
    user_id: userId,
    provider: identity.provider,
    provider_user_id: identity.provider_user_id,
    email: identity.email,
  });

  if (error) {
    throw new Error("auth_identity_creation_failed");
  }
}

async function upsertOAuthTokens(
  userId: string,
  provider: AuthProvider,
  tokens: OAuthTokens
): Promise<void> {
  const oauthProvider = authToOAuthProvider[provider];

  const { data: existing } = await supabase
    .from("oauth_tokens")
    .select("id")
    .eq("user_id", userId)
    .eq("provider", oauthProvider)
    .single();

  const tokenData = {
    access_token_enc: encrypt(tokens.access_token),
    refresh_token_enc: encrypt(tokens.refresh_token),
    scopes: tokens.scopes || [],
    expires_at: tokens.expiry?.toISOString(),
  };

  if (existing) {
    const { error } = await supabase
      .from("oauth_tokens")
      .update(tokenData)
      .eq("id", existing.id);

    if (error) {
      throw new Error("oauth_token_update_failed");
    }
  } else {
    const { error } = await supabase.from("oauth_tokens").insert({
      user_id: userId,
      provider: oauthProvider,
      ...tokenData,
    });

    if (error) {
      throw new Error("oauth_token_insert_failed");
    }
  }
}

export async function getUserById(userId: string): Promise<UserDB | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      // Non-standard error occurred
    }
    return null;
  }

  return data;
}

export async function getOAuthTokens(
  userId: string,
  provider: AuthProvider
): Promise<{ access_token: string; refresh_token: string } | null> {
  const oauthProvider = authToOAuthProvider[provider];

  const { data, error } = await supabase
    .from("oauth_tokens")
    .select("access_token_enc, refresh_token_enc")
    .eq("user_id", userId)
    .eq("provider", oauthProvider)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      // Non-standard error occurred
    }
    return null;
  }

  return data
    ? {
        access_token: decrypt(data.access_token_enc),
        refresh_token: decrypt(data.refresh_token_enc),
      }
    : null;
}

export async function updateRefreshToken(
  userId: string,
  provider: AuthProvider,
  newRefreshToken: string
): Promise<void> {
  const oauthProvider = authToOAuthProvider[provider];

  const { error } = await supabase
    .from("oauth_tokens")
    .update({ refresh_token_enc: encrypt(newRefreshToken) })
    .eq("user_id", userId)
    .eq("provider", oauthProvider);

  if (error) {
    throw new Error("refresh_token_update_failed");
  }
}

export async function deleteUserAccount(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await supabase.from("oauth_tokens").delete().eq("user_id", userId);
    await supabase.from("auth_identities").delete().eq("user_id", userId);

    await supabase
      .from("invite_codes")
      .update({ user_id: null, used_at: null })
      .eq("user_id", userId);

    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      return { success: false, error: "Failed to delete account" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete account" };
  }
}
