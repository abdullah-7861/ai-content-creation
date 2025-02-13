"use client";
import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <div className="bg-slate-100 min-h-screen">
      {/* search section */}
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      {/* <SearchSection onSearchInput(value: string){ setUserSearchInput } /> */}
      
      {/* Template List section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
