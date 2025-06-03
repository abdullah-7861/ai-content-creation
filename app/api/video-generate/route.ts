import { NextResponse } from "next/server";
import { CheckGenerationLimit, increaseGenerationLimit } from "../generate-limit/route";

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt } = body;

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  const freeTrial = await CheckGenerationLimit();
  // console.log("free trial", freeTrial)
  if (!freeTrial) {
    // console.log("free trial has expired,");
    return NextResponse.json(
      { error: "Free Trial Has Expire." },
      { status: 403 }
    );
  }

  try {
    const MODEL_VERSION =
      "8c47da666861d081eeb4d1261853087de23923a268a69b63febdf5dc1dee08e4"; // Lightricks/LTX-Video

    const predictionRes = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: MODEL_VERSION,
          input: {
            prompt: prompt,
          },
        }),
      }
    );
    
    // If Free credits, then increase them
      await increaseGenerationLimit();
      
    const prediction = await predictionRes.json();
    // Log raw prediction response to check its structure
    console.log("Raw Prediction Response:", prediction);

    if (!prediction?.id) {
      return NextResponse.json(
        { error: "Failed to start prediction" },
        { status: 500 }
      );
    }

    let finalPrediction = prediction;
    while (
      finalPrediction.status !== "succeeded" &&
      finalPrediction.status !== "failed" &&
      finalPrediction.status !== "canceled"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const pollRes = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      finalPrediction = await pollRes.json();
    }

    // Log final prediction response to check the status
    console.log("Final Prediction Response:", finalPrediction);

    if (finalPrediction.status !== "succeeded") {
      return NextResponse.json(
        { error: "Video generation failed" },
        { status: 500 }
      );
    }

    const videoUrl = finalPrediction?.output?.[0];

    if (!videoUrl) {
      return NextResponse.json(
        { error: "No video URL returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({ videoUrl });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error during video generation" },
      { status: 500 }
    );
  }
}
