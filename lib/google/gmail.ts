import { upsertGmailWatch } from "@/lib/db/users";

const GMAIL_WATCH_URL = "https://gmail.googleapis.com/gmail/v1/users/me/watch";
const PUBSUB_TOPIC = "projects/almanacai/topics/gmail-push-topic";
const WATCH_EXPIRY_DAYS = 7;

export interface GmailWatchResponse {
  historyId: string;
}

/**
 * Start watching a user's Gmail inbox for changes.
 * Stores watch info in google_push_notification table.
 * 
 * @param userId - User's database ID
 * @param accessToken - User's Gmail access token
 * @returns Watch response with historyId, or null on failure
 */
export async function startGmailWatch(
  userId: string,
  accessToken: string
): Promise<GmailWatchResponse | null> {
  try {
    const response = await fetch(GMAIL_WATCH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: PUBSUB_TOPIC,
        labelIds: ["INBOX"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to start Gmail watch: ${response.status} ${response.statusText}`,
        errorText
      );
      return null;
    }

    const data: GmailWatchResponse = await response.json();

    // Calculate expiration: 7 days from now (Gmail watch default)
    const expirationDate = new Date(
      Date.now() + WATCH_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    );

    // Store watch info in database
    await upsertGmailWatch(userId, data.historyId, expirationDate);

    return data;
  } catch (error) {
    console.error("Failed to start Gmail watch:", error);
    return null;
  }
}
