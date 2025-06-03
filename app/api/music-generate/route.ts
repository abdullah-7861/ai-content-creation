
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
    const MODEL_VERSION = "9aff84a639f96d0f7e6081cdea002d15133d0043727f849c40abdd166b7c75a8"; // stable-audio-open-1.0

    // Step 1: Send initial prediction request
    const predictionRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          prompt,
          seed: Math.floor(Math.random() * 1000000),
          duration: 8,
          guidance_scale: 7,
          classifier_free_guidance: true,
          stereo: true,
        },
      }),
    });

    // If free credits, then increment them by 1
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

    // Step 2: Poll the prediction until it's done
    let finalPrediction = prediction;
    while (
      finalPrediction.status !== "succeeded" &&
      finalPrediction.status !== "failed" &&
      finalPrediction.status !== "canceled"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2s
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
        { error: "Music generation failed" },
        { status: 500 }
      );
    }

    const audioUrl = finalPrediction?.output;

    if (!audioUrl) {
      console.error("No audio URL returned:", finalPrediction);
      return NextResponse.json(
        { error: "No audio URL returned from model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error during generation" },
      { status: 500 }
    );
  }
}
