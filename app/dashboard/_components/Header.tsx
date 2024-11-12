"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Loader2Icon, LogOut } from "lucide-react";

import React, { useState } from "react";

function Header() {
  const [click, setClick] = useState(false);
  return (
    <div className=" p-6 shadow-sm border-b-2 flex justify-end items-center bg-white ">
      <Button
        disabled={click}
        onClick={(e) => setClick(true)}
        className="bg-purple-700 hover:bg-purple-600 "
      >
        {click && <Loader2Icon className="animate-spin" />}
        <SignOutButton />
        <LogOut />
      </Button>
    </div>
  );
}

export default Header;
