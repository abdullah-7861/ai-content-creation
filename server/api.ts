/**
 * Send a request to your backend API to generate music
 */
export async function generateMusic(prompt: string): Promise<string> {
  try {
    const response = await fetch("/api/music-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate music");
    }

    return data.audioUrl;
  } catch (error) {
    console.error("Error generating music:", error);
    throw error;
  }
}
