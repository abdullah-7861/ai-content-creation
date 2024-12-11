import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { ProfessionalExperienceTable } from "@/utils/schema";
import exp from "constants";
import { eq } from "drizzle-orm";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { list } from "postcss";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

export interface FORM {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  workSummery: string;
}

const formField: FORM = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};
function ExperienceForm() {
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState<FORM[]>([
    { ...formField },
  ]);
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const currentResumeId = useParams();

  useEffect(()=>{

    resumeInfo && setExperienceList(resumeInfo?.experience);
 
   },[])


  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FORM;

    const updatedExperienceList = experienceList.map((item, idx) =>
      idx === index ? { ...item, [fieldName]: value } : item
    );

    setExperienceList(updatedExperienceList);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };
  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
    // console.log(experienceList)
  }, [experienceList]);

  const onSave = async () => {
    // e.preventDefault();
    // console.log(formData)
    // updateResume(currentResumeId,formData);
    await SaveExperience(experienceList, currentResumeId);
    
  };

  const SaveExperience = async (
    experienceList: FORM[],
    currentResumeId: any
  ) => {
    await db
      .delete(ProfessionalExperienceTable)
      .where(
        eq(ProfessionalExperienceTable?.resumeId, currentResumeId?.resumeId)
      );

    const result = await db.insert(ProfessionalExperienceTable).values(
      experienceList.map((item, index) => ({
        resumeId: currentResumeId?.resumeId,
        Positiontitle: item?.title,
        companyName: item?.companyName,
        city: item?.city,
        state: item?.state,
        startDate: item?.startDate,
        endtDate: item?.endDate,
        workSummary: item?.workSummery,
      }))
    );
    console.log(result);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous work experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg ">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className="col=span-2">
                  <label className="text-xs"> Work Summary</label>
                  <Textarea
                    name="workSummery"
                    className="w-96"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.workSummery}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-purple-600"
              onClick={AddNewExperience}
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              className="text-purple-600"
              onClick={RemoveExperience}
            >
              - Remove Experience
            </Button>
          </div>
          <Button
            onClick={onSave}
            className=" bg-purple-600 hover:bg-purple-500 "
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceForm;
