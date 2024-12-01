"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import dummy from "@/app/(data)/dummy";

function EditResume() {
  
  const [resumeInfo,setResumeInfo] = useState<any>();
  useEffect(() => {
    
    setResumeInfo(dummy);
  }, []);
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      {/* Form Section */}
      <FormSection />
      {/* Preview Section */}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>  );
}

export default EditResume;
