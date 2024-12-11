"use client";
import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import ResumePreview from "@/app/resume/createresume/[resumeId]/edit/_components/ResumePreview";
import { fetchResumeDetails } from "@/app/resume/createresume/[resumeId]/edit/page";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RWebShare } from "react-web-share";

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState<any>();
  const resumeid = useParams();

  useEffect(() => {
    fetchResumeDetails(resumeid, setResumeInfo);
  }, []);

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print" className=" my-8 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-medium">
          Congrats! your Ultimate AI Generated Resume is ready
        </h2>
        <p className="text-center text-gray-400">
          Now you are ready to download your resume and you can share your url
          with your friends
        </p>
        <div className="flex justify-between px-44 py-10">
       <div className="flex gap-2">
       <a href="/resume"><Button className=" bg-purple-600 hover:bg-purple-500"><HomeIcon/></Button> </a> 
          <Button
            className=" bg-purple-600 hover:bg-purple-500"
            onClick={HandleDownload}
          >
            Download
          </Button>
       </div>
        
          <RWebShare
            data={{
              text: "This is My Resume, Open Url",
              url: process.env.VITE_BASE_URL, // Use process.env for Next.js
              title: resumeInfo?.firstName+""+resumeInfo?.lastName+" Resume",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="bg-purple-600 hover:bg-purple-500">Share</Button>
          </RWebShare>
        </div>
      </div>
      <div id="print-area" className=" my-8 mx-20 md:mx-20 lg:mx-56">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
function GetResumeWithAllDetails(currentResumeId: any) {
  throw new Error("Function not implemented.");
}
