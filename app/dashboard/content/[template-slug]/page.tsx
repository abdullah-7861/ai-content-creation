"use client";
import React, { useEffect, useState } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import Template from "@/app/(data)/Template";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { chatSession } from "@/utils/AIModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import openai from "@/utils/ImageGen";
import axios from "axios";
import router, { Router } from "next/router";
import { toast } from "sonner";
import { generateImage } from "@/app/api/generate-image/route";

interface PROPS {
  params: {
    "template-slug": string;
  };
}
const apiKey = "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";

function CreatNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);

  const [aiOutput, setAiOutput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [music, setMusic] = useState<string>();
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { user } = useUser();

  const GenerateAIContent = async (formData: any) => {
    // console.log(formData);
    setLoading(true);

    const selectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + "," + selectedPrompt;
    const result = await chatSession.sendMessage(FinalAIPrompt);
    // console.log(result.response.text());
    setAiOutput(result.response.text());
    await SaveInDb(
      JSON.stringify(formData),
      selectedTemplate?.slug,
      result.response.text()
    );
    setLoading(false);
  };

  // Client-side fetch in your `page.tsx`

  // const generateMusic = async (formData: any) => {
  //   console.log(formData);
  //   try {
  //     setImage([]);
  //     const response = await axios.post("/api/image", formData);
  //     const urls = response.data.map((image: { url: string }) => image.url);
  //     console.log(response);
  //     setImage(urls);
  //     console.log(response);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  const handleGenerate = async (prompt: string) => {
    console.log(prompt, apiKey);
    setLoading(true);
    setCurrentPrompt(prompt);

    try {
      const newImageUrl = await generateImage(prompt, apiKey);
      setImageUrl(newImageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Failed to generate image:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate image"
      );
      setImageUrl("");
    } finally {
      setLoading(false);
    }
  };

  // const generateImages = async (formData: any) => {
  //   console.log(formData);
  //   // try {
  //   //   setLoading(true);
  //   //   const response = await fetch("/api/music", {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify({
  //   //       prompt: prompt,
  //   //     }),
  //   //   });

  //   //   if (!response.ok) {
  //   //     throw new Error(`HTTP error! status: ${response.status}`);
  //   //   }

  //   //   const data = await response.json();
  //   //   setMusic(data.audio);
  //   //   // setImage(data);
  //   // } catch (error) {
  //   //   console.log("error:", error);
  //   // } finally {
  //   //   setLoading(false);
  //   //   setPrompt("");
  //   // }
  // };

  // const handleGenerateAudio = async (formData: any) => {
  //   console.log(formData);
  //   // if (!formData) {
  //   //   alert("Please enter a prompt");
  //   //   return;
  //   // }

  //   try {
  //     const response = await fetch("/api/music", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt: formData.musicprompt }),
  //     });

  //     const data = await response.json();
  //     if (data.audioUrl) {
  //       setMusic(data.audioUrl);
  //       console.log("this is music ", music);
  //     } else {
  //       console.error("No audio URL returned");
  //     }
  //   } catch (error) {
  //     console.error("Error generating audio:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  // const onSubmit = async (FormData: any) => {
  //   try {
  //     setMusic(undefined);
  //     console.log(FormData.musicprompt);
  //     const response = await axios.post("/api/music", {
  //       prompt: FormData.musicprompt,
  //     });
  //     console.log("this is response on client side", response);
  //     // setMusic(response.data.audio);
  //   } catch (error: any) {
  //     console.log("eeror occur", error);
  //   }
  // };

  const SaveInDb = async (formData: any, slug: any, aiOutput: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateslug: slug,
      aiResponse: aiOutput,
      createdBy: user?.username as string,
      createdAt: moment().format("DD/MM/YY"),
    });
    console.log(result);
  };

  return (
    <div className="p-7  bg-slate-100 min-h-screen ">
      <Link href={"/dashboard"}>
        <Button className="bg-purple-600   hover:bg-purple-500">
          {" "}
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* formsection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          userImageInput={(v: any) => handleGenerate(v)}
          loading={loading}
        />
        {/* outputsection */}
        <div className="col-span-2  ">
          <OutputSection
            AiOutput={aiOutput}
            imageUrl={imageUrl}
            imagePrompt={currentPrompt}
            MusicOutput={music} // MusicOutput={music}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatNewContent;
