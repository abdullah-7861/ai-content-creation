import Template from "@/app/(data)/Template";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export type OPTION  = string[]; // List of strings for quantity

// Define the FORM interface
export interface FORM {
  label: string;
  field: string;
  name: string;
  defaultvalue: string;
  required?: boolean; // Optional
  options?: OPTION; // Optional list of strings
}



function TemplateListSection({ userSearchInput }: any) {
  const [templateList, setTemplateList] = useState(Template);

  useEffect(() => {
    if (userSearchInput) {
      const filterData = Template.filter((item) => {
        return item.name.toLowerCase().includes(userSearchInput.toLowerCase());
      });
      setTemplateList(filterData);
    } else {
      setTemplateList(Template);
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10">
      {templateList.map((item: TEMPLATE, index: number) => (
        <TemplateCard {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
