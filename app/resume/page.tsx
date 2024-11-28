"use client";
import { useUser } from "@clerk/clerk-react";
import AddResume from "./_components/AddResume";
import { db } from "@/utils/db";
import { ResumeTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import ResumeCardItem from "./_components/ResumeCardItem";


export interface RESUMELIST {
  resumeid: string;
  title: string;
  createdBy: string; // Allow null values
  createdAt: string; // Allow null values
}

 function Page() {
  const  { user }  =  useUser();
  const [resumeList,setResumeList] = useState<RESUMELIST[]>([]);

  useEffect(() => {
    user&&GetResumeList();
  }, [user]);


  const GetResumeList = async () => {
   
    {/*@ts-ignore */}
     const ResumeList:RESUMELIST[] = await db.select().from(ResumeTable).where(eq(ResumeTable?.createdBy,user?.username));
   
     setResumeList(ResumeList)
     console.log(resumeList)
  };


  useEffect(() => {
    console.log("Updated resumeList:", resumeList);
}, [resumeList]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume </h2>
      <p>Start Creating AI Resume for your next Job role </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
          {resumeList.length > 0 && resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index}/>
          ))}
        
      </div>
    </div>
  );
}

export default Page;
