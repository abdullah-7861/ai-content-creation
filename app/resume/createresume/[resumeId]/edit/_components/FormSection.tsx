import React, { useState } from "react";
import PersonalDetailForm from "./_forms/PersonalDetailForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import SummaryForm from "./_forms/SummaryForm";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(2);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button size="sm" variant="outline" className=" flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
        <div className="flex gap-1">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className=" bg-purple-600 hover:bg-purple-500"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2 bg-purple-600 hover:bg-purple-500"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal Detail */}
      {activeFormIndex == 1 ? (
        <PersonalDetailForm enabledNext={(v: boolean) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? <SummaryForm enabledNext={(v: boolean) => setEnableNext(v)}/> :null}
      {/* Summary */}
    
      {/* Experience */}
      {/* Education */}
      {/* Skills */}
    </div>
  );
}

export default FormSection;
