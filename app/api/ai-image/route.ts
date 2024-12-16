import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:"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",
});

export async function POST(request: any) {
  const body = await request.json();

  const { prompt } = body;

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
    });

    const image = response.data[0].url;
    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      { error: "An error occurred, please try again later! " },
      { status: 500 }
    );
  }
}
