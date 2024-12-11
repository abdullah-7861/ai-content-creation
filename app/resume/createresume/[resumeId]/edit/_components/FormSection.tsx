"use client ";
import React, { useEffect, useState } from "react";
import PersonalDetailForm from "./_forms/PersonalDetailForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, HomeIcon, LayoutGrid } from "lucide-react";
import SummaryForm from "./_forms/SummaryForm";
import ExperienceForm from "./_forms/ExperienceForm";
import EducationForm from "./_forms/EducationForm";
import SkillForm from "./_forms/SkillForm";

import { useParams, useRouter } from "next/navigation";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const currentResumeId = useParams();
  const router = useRouter();
  
  useEffect(() => {
    if (activeFormIndex === 6 && currentResumeId?.resumeId) {
      router.push(`/resume/my-resume/${currentResumeId.resumeId}/view`);
    }
  }, [activeFormIndex, currentResumeId, router]);
   
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
         <a href="/resume"><Button className=" bg-purple-600 hover:bg-purple-500"><HomeIcon/></Button> </a> 
        <ThemeColor currentResumeId={currentResumeId}/>
        </div>
        
        <div className="flex gap-1">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className=" bg-purple-600 hover:bg-purple-500"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
          
            className="flex gap-2 bg-purple-600 hover:bg-purple-500"
            size="sm"
            onClick={() => {
         
              setActiveFormIndex(activeFormIndex + 1)}}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      
     
      {activeFormIndex == 1 ? (
        <PersonalDetailForm  />
      ) : activeFormIndex == 2 ? <SummaryForm /> : activeFormIndex==3 ? <ExperienceForm  /> :activeFormIndex==4 ? <EducationForm /> : activeFormIndex==5 ? <SkillForm /> :  null}
      
    
      {/* Experience */}
      {/* Education */}
      {/* Skills */}
    </div>
  );
}

export default FormSection;
