import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/AIModal";
import { db } from "@/utils/db";
import { ResumeTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Brain, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const summaryPrompt ="Job Title: {jobTitle}, Depends on job title give me summary for my resume. you dont have to mention skills or experience, just based on title give me 1 summary option of 4 lines.   ";
function SummaryForm({ enabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const [summary, setSummary] = useState<string>("");
  const [loading,setLoading] = useState(false)
  const [aiGeneratedSummary,setAiGeneratedSummary] = useState("");
  const currentResumeId = useParams();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = summaryPrompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await chatSession.sendMessage(PROMPT);
    setAiGeneratedSummary(JSON.stringify(result.response.text()));
    
    setLoading(false)
  };

  const onSave = (e: any) => {
    e.preventDefault();

    // Will update or push resume INfo in DB
    updateResume(currentResumeId, summary);
    enabledNext(true);
  };

  const updateResume = async (currentResumeId: any, summary: string) => {
    {
      /*@ts-ignore */
    }
    const result = await db
      .update(ResumeTable)
      .set({
        summary: summary,
      })
      .where(eq(ResumeTable?.resumeid, currentResumeId?.resumeId));
    // console.log(result);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your Job title</p>
        <form onSubmit={onSave} className="mt-7">
          <div className="flex justify-between items-end">
            <label> Add Summary</label>
            <Button
              className="border-purple-600 text-purple-600"
              size="sm"
              variant="outline"
              type="button"
              onClick={()=>GenerateSummaryFromAI()}
            >
              <Brain className="h-4 w-4" />
              Generate From AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-5 "
            onChange={(e) => {
              enabledNext(false);
              return setSummary(e.target.value);
            }}
          />

          <div className="mt-2 flex justify-end">
            <Button
            disabled={loading}
              type="submit"
              className=" bg-purple-600 hover:bg-purple-500 "
            >
            {loading?<LoaderCircle className="animate-spin" /> : 'Save'}
            
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummary &&<div>
            
        <h2 className="font-bold text-lg m-5">Suggestions:</h2>
        <div className="px-5">
          <p>{aiGeneratedSummary}</p>
        </div>
      </div>}
    </div>
  );
}

export default SummaryForm;
