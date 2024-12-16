import { NextResponse } from "next/server";
import OpenAI from "openai";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(request: Request) {
  const body = await request.json();

  const { prompt } = body;

  try {
    
    const input = {
        prompt_b: "90's rap"
    };
    
    const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });
    console.log(response)
    //=> {"audio":"https://replicate.delivery/pbxt/SCiO1SBkqj7gL5c...

  
    return NextResponse.json(response);
  } catch (error) {
    console.log("Music Error: ", error);
    return NextResponse.json(
      { error: "An error occurred, please try again later! " },
      { status: 500 }
    );
  }
}
