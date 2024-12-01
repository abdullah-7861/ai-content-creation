import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { ResumeTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function SummaryForm({ enabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const [summary, setSummary] = useState<string>("");
  const currentResumeId = useParams();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const onSave = (e: any) => {
    e.preventDefault();

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
            >
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
              type="submit"
              className=" bg-purple-600 hover:bg-purple-500 "
            >
              {" "}
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SummaryForm;
