import React from "react";



function SummarySection({ resumeInfo }: any) {
  return <p className="text-xs">
    {
        resumeInfo?.summary
    }
  </p>;
}

export default SummarySection;
