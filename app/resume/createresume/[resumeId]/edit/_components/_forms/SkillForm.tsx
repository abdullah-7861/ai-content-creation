import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import { useParams } from "next/navigation";
import { db } from "@/utils/db";
import { SkillTable } from "@/utils/schema";
import { eq } from "drizzle-orm";

function SkillForm() {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const [skillList, setSkillList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const currentResumeId = useParams();

  useEffect(()=>{

    resumeInfo && setSkillList(resumeInfo?.skills);
 
   },[])

  const handleChange = (index: number, name: string, value: string) => {
    const updatedSkillList = skillList.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );

    setSkillList(updatedSkillList);
  };

  const AddNewSkill = () => {
    setSkillList([
      ...skillList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveSkill = () => {
    setSkillList((skillList) => skillList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillList,
    });
    // console.log(experienceList)
  }, [skillList]);

  const onSave = async () => {
    // e.preventDefault();
    // console.log(formData)
    // updateResume(currentResumeId,formData);
    await SaveEducationInDB(skillList, currentResumeId);
  };

  const SaveEducationInDB = async (skillList: any, currentResumeId: any) => {
    await db
    .delete(SkillTable)
    .where(
      eq(SkillTable?.resumeId, currentResumeId?.resumeId)
    );

    const result = await db.insert(SkillTable).values(
      skillList.map((item: any, index: any) => ({
        resumeId: currentResumeId?.resumeId,
        name: item?.name,
        rating: item?.rating,
      }))
    );
    console.log(result);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Working Skills</h2>
      <p>Add your Professional Skills</p>

      <div>
        {skillList.map((item, index) => (
          <div className="flex justify-between mb-5 border rounded-lg p-3 ">
            <div>
              <label className="">Name</label>
              <Input
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
                defaultValue={item?.name}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v: any) => handleChange(index, "rating", v)}
              
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-purple-600"
            onClick={AddNewSkill}
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            className="text-purple-600"
            onClick={RemoveSkill}
          >
            - Remove Education
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
  );
}

export default SkillForm;
