import React from "react";


function ProfesionalExperienceSection({ resumeInfo }: any) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Expererience
      </h2>
      <hr style={{
        borderColor:resumeInfo?.themeColor
      }}/>

      {resumeInfo?.experience.map((experience:any,index:any)=>(
        <div key={index} className="my-5">
            <h2 className="text-sm font-bold" 
            style={{
              color:resumeInfo?.themeColor
          }}>{experience?.title}</h2>
            <h2 className="text-xs flex justify-between">{experience?.companyName},{experience?.city},{experience?.state}
                <span>{experience?.startDate} - {experience?.currenctlyWorking?'present':experience.endDate} </span>
            </h2>
            <p className="text-xs my-2">
                {experience?.workSummery}
            </p>
        </div>
      ))}

    </div>
  );
}

export default ProfesionalExperienceSection;
