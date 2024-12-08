import { Notebook } from "lucide-react";
import Link from "next/dist/client/link";
import Image from "next/image";
// import Link from 'next/link'
import React from "react";

function ResumeCardItem({ resume }: any) {
  console.log(resume?.themeColor)
  return (
    <a href={"/resume/createresume/" + resume.resumeid + "/edit"}>
      <div
        className="p-14 flex justify-center items-center h-[280px] bg-gradient-to-b from-pink-200 via-purple-300 to-blue-300 rounded-lg border-t-4 border-red-400 hover:scale-105 transition-all hover:shadow-md "
        
      >
        
        <Image src="/cv.png" width={80} height={80} alt={""} />
      </div>
      <h2 className="text-center my-1">{resume.title}</h2>
    </a>
  );
}

export default ResumeCardItem;
