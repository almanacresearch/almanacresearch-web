const NEW_USER_ENQUEUE_URL =
  "https://zbobxxvq45.execute-api.ap-south-1.amazonaws.com/dev/enqueue/new-user";

export async function triggerNewUserQueue(userId: string): Promise<void> {
  const payload = {
    user_id: userId,
  };

  try {
    const response = await fetch(NEW_USER_ENQUEUE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `Failed to enqueue new user: ${response.status} ${response.statusText}`
      );
      return;
    }
  } catch (error) {
    console.error("Failed to trigger new user queue:", error);
  }
}
