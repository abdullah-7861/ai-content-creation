"use server";

import { v2 as cloudinary } from "cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const extractBackgroundSchema = z.object({
  activeImage: z.string(),
  format: z.string(),
});

async function checkImageProcessing(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export const extractBackground = actionClient
  .schema(extractBackgroundSchema)
  .action(async ({ parsedInput: { activeImage, format } }) => {
    const parts = activeImage.split("/upload/");
    const transformation = [
      "e_background_removal", // Remove subject
      "e_replace_color:white", // Replace the foreground with white
      "e_negate", // Invert to highlight the background
    ].join(",");

    const backgroundUrl = `${parts[0]}/upload/${transformation}/${parts[1]}`;

    // Poll the URL to ensure image is processed
    const maxAttempts = 20;
    const delay = 1000; // 1 second
    let isProcessed = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkImageProcessing(backgroundUrl);
      if (isProcessed) break;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!isProcessed) {
      throw new Error("Image processing timed out");
    }

    return { success: backgroundUrl };
  });
