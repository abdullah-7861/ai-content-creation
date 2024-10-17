"use client";
import React, { useEffect } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import Template from "@/app/(data)/Template";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreatNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const GenerateAIContent = (formData: any) => {
    console.log(formData);
  };

  return (
    <div className="p-7">
      <Link href={"/dashboard"}>
        <Button className="bg-purple-600   hover:bg-purple-500"> <ArrowLeft/> Back</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* formsection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
        />
        {/* outputsection */}
        <div className="col-span-2">
          {" "}
          <OutputSection />
        </div>
      </div>
    </div>
  );
}

export default CreatNewContent;
