const ENQUEUE_URL =
  "https://zbobxxvq45.execute-api.ap-south-1.amazonaws.com/dev/enqueue/new-user";

export async function triggerSyncQueue(
  connectedAccountId: string
): Promise<void> {
  const payload = {
    connected_account_id: connectedAccountId,
  };

  try {
    const response = await fetch(ENQUEUE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `Failed to enqueue sync: ${response.status} ${response.statusText}`
      );
      return;
    }
  } catch (error) {
    console.error("Failed to trigger sync queue:", error);
  }
}
