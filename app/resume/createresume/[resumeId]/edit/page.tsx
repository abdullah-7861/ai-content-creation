"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import dummy from "@/app/(data)/dummy";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";

import {
  EducationTable,
  ProfessionalExperienceTable,
  ResumeTable,
  SkillTable,
} from "@/utils/schema";

export const getResumeWithAllDetails = async (
  currentResumeId: any
): Promise<any> => {
  const result = await db
    .select()
    .from(ResumeTable)
    .leftJoin(
      ProfessionalExperienceTable,
      eq(ProfessionalExperienceTable.resumeId, ResumeTable.resumeid)
    )
    .leftJoin(
      EducationTable,
      eq(EducationTable.resumeId, ResumeTable.resumeid)
    )
    .leftJoin(SkillTable, eq(SkillTable.resumeId, ResumeTable.resumeid))
    .where(eq(ResumeTable.resumeid, currentResumeId.resumeId));

  // Initialize a single object to store the grouped result
  const groupedResult = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    themeColor: "",
    experience: [] as Array<{
      id: number;
      title: string;
      companyName: string;
      city: string;
      state: string;
      startDate: string;
      endDate: string;
      currentlyWorking: boolean;
      workSummery: string;
    }>,
    education: [] as Array<{
      id: number;
      universityName: string;
      startDate: string;
      endDate: string;
      degree: string;
      major: string;
      description: string;
    }>,
    skills: [] as Array<{
      id: number;
      name: string;
      rating: number;
    }>,
  };

  result.forEach((row) => {
    const {
      ResumeTable: resume,
      ProfessionalExperienceTable: experience,
      EducationTable: education,
      SkillTable: skills,
    } = row;

    // Populate resume details (once)
    if (!groupedResult.firstName) {
      groupedResult.firstName = resume.firstName ?? "";
      groupedResult.lastName = resume.lastName ?? "";
      groupedResult.jobTitle = resume.jobTitle ?? "";
      groupedResult.address = resume.address ?? "";
      groupedResult.phone = resume.phone ?? "";
      groupedResult.email = resume.email ?? "";
      groupedResult.summary = resume.summary ?? "";
      groupedResult.themeColor = resume.themeColor ?? "";
    }

    // Add professional experience if available and not already added
    if (experience && !groupedResult.experience.find((exp) => exp.id === experience.Experienceid)) {
      groupedResult.experience.push({
        id: experience.Experienceid,
        title: experience.Positiontitle,
        companyName: experience.companyName,
        city: experience.city ?? "",
        state: experience.state ?? "",
        startDate: experience.startDate ?? "",
        endDate: experience.endtDate ?? "",
        currentlyWorking: true, // Replace with actual logic if needed
        workSummery: experience.workSummary ?? "",
      });
    }

    // Add education record if available and not already added
    if (education && !groupedResult.education.find((edu) => edu.id === education.educationid)) {
      groupedResult.education.push({
        id: education.educationid,
        universityName: education.universityName,
        startDate: education.startDate ?? "",
        endDate: education.endtDate ?? "",
        degree: education.degree ?? "",
        major: education.major ?? "",
        description: education.description ?? "",
      });
    }

    // Add skill if available and not already added
    if (skills && !groupedResult.skills.find((skill) => skill.id === skills.skillid)) {
      groupedResult.skills.push({
        id: skills.skillid,
        name: skills.name,
        rating: skills.rating,
      });
    }
  });
  console.log(groupedResult)
  return groupedResult;
};

export const fetchResumeDetails = async (currentResumeId:any, setResumeInfo:any) => {
  const resumeDetails = await getResumeWithAllDetails(currentResumeId); // Await the function
  setResumeInfo(resumeDetails);  
};

function EditResume() {
  const [resumeInfo, setResumeInfo] = useState<any>();
  const currentResumeId = useParams();

  useEffect(() => {
   

    fetchResumeDetails(currentResumeId,setResumeInfo) ;
    
  }, []);

  // Function to Get Resume Detail from Database
 
 
 

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
