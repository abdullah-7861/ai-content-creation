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

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreatNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);

  const [aiOutput, setAiOutput] = useState<string>("");

  const { user } = useUser();

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);

    const selectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + "," + selectedPrompt;
    const result = await chatSession.sendMessage(FinalAIPrompt);
    // console.log(result.response.text());
    setAiOutput(result.response.text());
    await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, result.response.text());
    setLoading(false);
  };

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
    <div className="p-7">
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
          loading={loading}
        />
        {/* outputsection */}
        <div className="col-span-2">
          {" "}
          <OutputSection AiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreatNewContent;
