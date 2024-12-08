import { ResumeInfoContext } from "@/app/resume/(context)/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { University } from "lucide-react";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

interface FORM {
  university: "";
  degree: "";
  major: "";
  startDate: "";
  endDate: "";
  description: "";
}

function EducationForm({ enabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const [educationList, setEducationList] = useState<FORM[]>([
    {
      university: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const handelChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FORM;

    const updatedEducationList = educationList.map((item, idx) =>
      idx === index ? { ...item, [fieldName]: value } : item
    );

    setEducationList(updatedEducationList);
  };

  const AddNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        university: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
    // console.log(experienceList)
  }, [educationList]);

  const onSave = () => {
    // e.preventDefault();
    // console.log(formData)
    // updateResume(currentResumeId,formData);
    enabledNext(true);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your Education Details</p>

      <div>
        {educationList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(event) => handelChange(index, event)}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(event) => handelChange(index, event)}
                />
              </div>

              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(event) => handelChange(index, event)}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handelChange(index, event)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handelChange(index, event)}
                />
              </div>

              <div>
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(event) => handelChange(index, event)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-purple-600"
                  onClick={AddNewEducation}
                >
                  + Add More Education
                </Button>
                <Button
                  variant="outline"
                  className="text-purple-600"
                  onClick={RemoveEducation}
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
        ))}
      </div>
    </div>
  );
}

export default EducationForm;
