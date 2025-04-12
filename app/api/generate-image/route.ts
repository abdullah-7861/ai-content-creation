/**
 * Service for interacting with Hugging Face AI API
 */

// Stable Diffusion v1.5 model ID
const MODEL_ID = "runwayml/stable-diffusion-v1-5";
const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;

// Function to generate an image using Stable Diffusion
export async function generateImage(
  prompt: string,
  apiKey: string
): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Failed to generate image. Please try again."
      );
    }

    // Get the image as a blob
    const blob = await response.blob();
    // Convert blob to data URL
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
