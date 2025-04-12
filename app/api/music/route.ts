import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    console.log("this is prompt you entered", prompt);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    // const response = "this is your response";
    // console.log(response);

    const input = {
      prompt:
        "A wild and rebellious rock anthem with psychedelic and bluesy undertones, this song is loud and energetic.",
      save_spectrogram: true,
    };

    const response = await replicate.run(
      "zsxkib/flux-music:eebfed4a1749bb1172f005f71fac5a1e0377502ec149c9d02b56ac1de3aa9f07",
      { input }
    );
    // const response = await replicate.run(
    //   "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    //   {
    //     input: {
    //       prompt_a: prompt,
    //     },
    //   }
    // );
    console.log("this is reponse", response);

    return NextResponse.json(response);
  } catch (error) {
    console.log("Music Error: ", error);
    return NextResponse.json(
      { error: "An error occurred, please try again later!" },
      { status: 500 }
    );
  }
}
