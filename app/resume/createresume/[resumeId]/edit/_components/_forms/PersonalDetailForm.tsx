import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/db";
import { ResumeTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function PersonalDetailForm({ enabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const [formData, setFormData] = useState<any>({});
  const currentResumeId = useParams();

  useEffect(()=>{
   resumeInfo && setFormData(resumeInfo);

  },[resumeInfo])


  const handleInputChange = (e: any) => {
    
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]:value
    })

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e: any) => {
    e.preventDefault();
    // console.log(formData)
    updateResume(currentResumeId,formData);
    

  };

  
  const updateResume = async (currentResumeId: any, formData:any) => {

    {/*@ts-ignore */}
    const result = await db.update(ResumeTable).set({
        // @ts-ignore
        firstName:formData?.firstName,
        // @ts-ignore
        lastName:formData?.lastName,
        // @ts-ignore
        address:formData?.address,
        // @ts-ignore
        jobTitle:formData?.jobTitle,
        // @ts-ignore
        phone:formData?.phone,
        // @ts-ignore
        email:formData?.email,
        
        

    }).where(eq(ResumeTable?.resumeid,currentResumeId?.resumeId));
    // console.log(result);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with some basic Information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" className=" bg-purple-600 hover:bg-purple-500 ">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailForm;
