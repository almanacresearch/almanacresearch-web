import { supabase } from "@/lib/supabaseClient";
import { encrypt, decrypt } from "@/lib/auth/encryption";
import type { UserDB } from "@/lib/auth/types";

export type { UserDB };

export type AuthProvider = "google"; // extendable for other providers

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

export interface ConnectedAccounts {
  id: string;
  user_id: string;
  account_provider: AuthProvider;
  account_identifier: string;
  display_name: string | null;
  scopes: string[];
  created_at: string;
  updated_at: string;
}

export async function findOrCreateUser(
  identity: AuthIdentity,
  profile: { name: string; picture?: string },
  tokens: OAuthTokens,
): Promise<{ user: UserDB; isNewUser: boolean; connectedAccountId: string }> {
  const accountIdentifier = identity.email || identity.provider_user_id;
  const newScopes = tokens.scopes || [];

  // 1. Check if auth identity already exists
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

    const { account, previousScopes } = await upsertConnectedAccount(
      existingIdentity.user_id,
      identity.provider,
      accountIdentifier,
      profile.name,
      newScopes,
    );

    await upsertOAuthTokens(account.id, tokens, previousScopes);

    return { user, isNewUser: false, connectedAccountId: account.id };
  }

  // 2. Check if a user with the same primary email exists
  if (identity.email) {
    const { data: existingUserByEmail } = await supabase
      .from("users")
      .select("*")
      .eq("primary_email", identity.email)
      .single();

    if (existingUserByEmail) {
      await createAuthIdentity(existingUserByEmail.id, identity);

      const { account, previousScopes } = await upsertConnectedAccount(
        existingUserByEmail.id,
        identity.provider,
        accountIdentifier,
        profile.name,
        newScopes,
      );

      await upsertOAuthTokens(account.id, tokens, previousScopes);

      const now = new Date().toISOString();
      await supabase
        .from("users")
        .update({
          last_active: now,
          updated_at: now,
        })
        .eq("id", existingUserByEmail.id);

      return {
        user: existingUserByEmail,
        isNewUser: false,
        connectedAccountId: account.id,
      };
    }
  }

  // 3. Create a brand-new user
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

  const { account } = await upsertConnectedAccount(
    newUser.id,
    identity.provider,
    accountIdentifier,
    profile.name,
    newScopes,
  );

  await upsertOAuthTokens(account.id, tokens, []);

  return { user: newUser, isNewUser: true, connectedAccountId: account.id };
}

async function createAuthIdentity(
  userId: string,
  identity: AuthIdentity,
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

// ---------------------------------------------------------------------------
// Connected accounts
// ---------------------------------------------------------------------------

async function upsertConnectedAccount(
  userId: string,
  provider: AuthProvider,
  accountIdentifier: string,
  displayName: string,
  newScopes: string[],
): Promise<{ account: ConnectedAccounts; previousScopes: string[] }> {
  const { data: existing } = await supabase
    .from("connected_accounts")
    .select("*")
    .eq("user_id", userId)
    .eq("account_provider", provider)
    .eq("account_identifier", accountIdentifier)
    .single();

  if (existing) {
    const previousScopes: string[] = existing.scopes || [];
    const mergedScopes = [...new Set([...previousScopes, ...newScopes])];

    const { data: updated, error } = await supabase
      .from("connected_accounts")
      .update({
        display_name: displayName,
        scopes: mergedScopes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      throw new Error("connected_account_update_failed");
    }

    return { account: updated, previousScopes };
  }

  const { data: newAccount, error } = await supabase
    .from("connected_accounts")
    .insert({
      user_id: userId,
      account_provider: provider,
      account_identifier: accountIdentifier,
      display_name: displayName,
      scopes: newScopes,
    })
    .select()
    .single();

  if (error) {
    throw new Error("connected_account_creation_failed");
  }

  return { account: newAccount, previousScopes: [] };
}

// ---------------------------------------------------------------------------
// OAuth tokens  (keyed by connected_account_id)
// ---------------------------------------------------------------------------

async function upsertOAuthTokens(
  connectedAccountId: string,
  tokens: OAuthTokens,
  previousScopes: string[],
): Promise<void> {
  const newScopes = tokens.scopes || [];
  // Only overwrite access_token when the new token covers all previously-granted scopes
  const hasAllPreviousScopes =
    previousScopes.length === 0 ||
    previousScopes.every((s) => newScopes.includes(s));

  const { data: existing } = await supabase
    .from("oauth_tokens")
    .select("connected_account_id")
    .eq("connected_account_id", connectedAccountId)
    .single();

  if (existing) {
    const tokenData: Record<string, unknown> = {};

    if (hasAllPreviousScopes) {
      tokenData.access_token_enc = encrypt(tokens.access_token);
      tokenData.expires_at = tokens.expiry?.toISOString();
    }

    if (tokens.refresh_token) {
      tokenData.refresh_token_enc = encrypt(tokens.refresh_token);
    }

    if (Object.keys(tokenData).length > 0) {
      const { error } = await supabase
        .from("oauth_tokens")
        .update(tokenData)
        .eq("connected_account_id", connectedAccountId);

      if (error) {
        throw new Error("oauth_token_update_failed");
      }
    }
  } else {
    const { error } = await supabase.from("oauth_tokens").insert({
      connected_account_id: connectedAccountId,
      access_token_enc: encrypt(tokens.access_token),
      refresh_token_enc: tokens.refresh_token
        ? encrypt(tokens.refresh_token)
        : encrypt(""),
      expires_at: tokens.expiry?.toISOString(),
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

/**
 * Get decrypted OAuth tokens for a user's first connected account of the given provider.
 * Returns the connected_account_id alongside the tokens so callers can update later.
 */
export async function getOAuthTokens(
  userId: string,
  provider: AuthProvider,
): Promise<{
  access_token: string;
  refresh_token: string;
  connectedAccountId: string;
} | null> {
  const { data: connectedAccount, error: caError } = await supabase
    .from("connected_accounts")
    .select("id")
    .eq("user_id", userId)
    .eq("account_provider", provider)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (caError || !connectedAccount) {
    return null;
  }

  const { data, error } = await supabase
    .from("oauth_tokens")
    .select("access_token_enc, refresh_token_enc")
    .eq("connected_account_id", connectedAccount.id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    access_token: decrypt(data.access_token_enc),
    refresh_token: decrypt(data.refresh_token_enc),
    connectedAccountId: connectedAccount.id,
  };
}

/**
 * Update the refresh token for a specific connected account.
 */
export async function updateRefreshToken(
  connectedAccountId: string,
  newRefreshToken: string,
): Promise<void> {
  const { error } = await supabase
    .from("oauth_tokens")
    .update({ refresh_token_enc: encrypt(newRefreshToken) })
    .eq("connected_account_id", connectedAccountId);

  if (error) {
    throw new Error("refresh_token_update_failed");
  }
}

export async function deleteUserAccount(
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete oauth_tokens via connected_accounts (no CASCADE on that FK)
    const { data: connectedAccounts } = await supabase
      .from("connected_accounts")
      .select("id")
      .eq("user_id", userId);

    if (connectedAccounts && connectedAccounts.length > 0) {
      const accountIds = connectedAccounts.map((ca) => ca.id);
      await supabase
        .from("oauth_tokens")
        .delete()
        .in("connected_account_id", accountIds);
    }

    // Deleting the user cascades to:
    //   auth_identities, connected_accounts
    //   -> gmail_ingestion_state, gmail_watch_subscription (via connected_accounts cascade)
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      return { success: false, error: "Failed to delete account" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete account" };
  }
}

export async function hasRequiredChromeScopes(
  userId: string,
): Promise<boolean> {
  const requiredScopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/calendar.readonly",
  ];

  const { data, error } = await supabase
    .from("connected_accounts")
    .select("scopes")
    .eq("user_id", userId)
    .eq("account_provider", "google");

  if (error || !data || data.length === 0) {
    return false;
  }

  // True if any connected account has all required scopes
  return data.some((account) => {
    const accountScopes: string[] = account.scopes || [];
    return requiredScopes.every((scope) => accountScopes.includes(scope));
  });
}

/**
 * Link a new Google account to an existing (already signed-in) user.
 * Creates the auth_identity, connected_account, and oauth_tokens rows.
 * If the Google identity is already linked to a *different* user, throws.
 */
export async function linkConnectedAccount(
  userId: string,
  identity: AuthIdentity,
  profile: { name: string; picture?: string },
  tokens: OAuthTokens,
): Promise<{ connectedAccountId: string }> {
  const accountIdentifier = identity.email || identity.provider_user_id;
  const newScopes = tokens.scopes || [];

  // Guard: if this Google identity already belongs to another user, reject
  const { data: existingIdentity } = await supabase
    .from("auth_identities")
    .select("user_id")
    .eq("provider", identity.provider)
    .eq("provider_user_id", identity.provider_user_id)
    .single();

  if (existingIdentity && existingIdentity.user_id !== userId) {
    throw new Error("account_already_linked_to_another_user");
  }

  // Create auth_identity if it doesn't exist yet for this user
  if (!existingIdentity) {
    await createAuthIdentity(userId, identity);
  }

  const { account, previousScopes } = await upsertConnectedAccount(
    userId,
    identity.provider,
    accountIdentifier,
    profile.name,
    newScopes,
  );

  await upsertOAuthTokens(account.id, tokens, previousScopes);

  return { connectedAccountId: account.id };
}

export async function upsertGmailWatch(
  connectedAccountId: string,
  historyId: string,
  expiration: Date,
): Promise<boolean> {
  const watchStartedAt = new Date().toISOString();
  const watchExpiration = expiration.toISOString();

  const { error } = await supabase.from("gmail_watch_subscription").upsert(
    {
      connected_account_id: connectedAccountId,
      history_id: historyId,
      watch_started_at: watchStartedAt,
      watch_expiration: watchExpiration,
    },
    { onConflict: "connected_account_id" },
  );

  if (error) {
    console.error("Failed to store Gmail watch info:", error);
    return false;
  }

  return true;
}
