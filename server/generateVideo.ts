export async function generateVideo(prompt: string): Promise<string> {
    try {
      const response = await fetch("/api/video-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate video");
      }
  
      return data.videoUrl;
    } catch (error) {
      console.error("Error generating video:", error);
      throw error;
    }
  }
  