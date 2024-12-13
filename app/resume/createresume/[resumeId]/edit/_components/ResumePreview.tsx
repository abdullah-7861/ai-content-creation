import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import React, { useContext, useEffect } from "react";
import PersonalDetailPreview from "./_preview/PersonalDetailPreview";
import SummarySection from "./_preview/SummarySection";
import ProfesionalExperienceSection from "./_preview/ProfesionalExperienceSection";
import EducationPreviewSection from "./_preview/EducationPreviewSection";
import SkillPreviewSection from "./_preview/SkillPreviewSection";
import { db } from "@/utils/db";
import { ResumeTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";

function ResumePreview({resumeinfo}:any) {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const currentResumeId = useParams();
  // useEffect(() => {
  //   getThemeColorFromDB();
  // }, []);

  // const getThemeColorFromDB = async () => {
  //   const color = await db
  //     .select({ themeColor: ResumeTable?.themeColor })
  //     .from(ResumeTable)
  //     // @ts-ignore
  //     .where(eq(ResumeTable?.resumeid, currentResumeId?.resumeId));
  //   console.log(color); // [{ email: 'user@example.com' }]
  // };
  return (
    <div
      className="shadow-lg min-h-screen p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summary */}
      <SummarySection resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      <ProfesionalExperienceSection resumeInfo={resumeInfo} />
      {/* Education */}
      <EducationPreviewSection resumeInfo={resumeInfo} />
      {/* Skills */}
      <SkillPreviewSection resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
