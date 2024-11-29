import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./_preview/PersonalDetailPreview";
import SummarySection from "./_preview/SummarySection";
import ProfesionalExperienceSection from "./_preview/ProfesionalExperienceSection";
import EducationPreviewSection from "./_preview/EducationPreviewSection";
import SkillPreviewSection from "./_preview/SkillPreviewSection";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
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
        <EducationPreviewSection resumeInfo={resumeInfo}/>
      {/* Skills */}
      <SkillPreviewSection resumeInfo={resumeInfo}/>
    </div>
  );
}

export default ResumePreview;
