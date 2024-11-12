
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";

import { TEMPLATE } from "../_components/TemplateListSection";
import Template from "@/app/(data)/Template";
import { useClientContext } from "@clerk/shared/react/index";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string; // Allow null values
  templateslug: string;
  createdBy: string; // Allow null values
  createdAt: string; // Allow null values
}

async function History() {
  const user = await currentUser();


  {/*@ts-ignore */}
  const HistoryList:HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput?.createdBy, user?.username)).orderBy(desc(AIOutput.id));

  // Helper function to get template data
    const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | any = Template?.find(
      (item) => item.slug === slug
    );
    return template;
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">
        Search your previously generated AI content
      </p>

      {/* Table Header */}
      <div className="grid grid-cols-6 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESPONSE</h2>
        <h2 className="ml-5">DATE</h2>
        <h2>WORDS</h2>
        
      </div>
       { HistoryList.map((item:HISTORY, index: number)=>(
          <>
          <div className="grid grid-cols-6 my-5 py-3 px-3" key={index}>
            <h2 className="col-span-2 flex gap-2 items-center">
              {/* Ensure src is valid and provide fallback */}
              <Image
                src={
                  GetTemplateName(item?.templateslug)?.icon ||
                  "/default-icon.png"
                }
                alt="Template Icon"
                width={25}
                height={25}
              />
              {GetTemplateName(item.templateslug)?.name}
            </h2>
            <h2 className="col-span-2 line-clamp-3 ">{item?.aiResponse}</h2>
            <h2 className="ml-5">{item?.createdAt}</h2>
            {/* Handle null dates */}
            <h2 className="ml-3">{item.aiResponse?.length}</h2>
            {/* Handle null AI responses */}
            
          </div>
          <hr />
          </>
        ))}
     
   
    </div>
  );
}

export default History;
