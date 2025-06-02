"use client";


import React, { useState } from "react";
import { Loader2Icon, LogOut, UserIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/clerk-react";
import Header from "../dashboard/_components/Header";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [click, setClick] = useState(false);
  return (
    <div>
      <Header/>
      {/* <div id="no-print" className=" py-4 px-16 shadow-sm border-b-2 flex justify-between items-center bg-white ">
        <a href="/">
          <Image src={"/logo.svg"} alt="logo" width={120} height={100} />
        </a>
        <div className="">
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
      </div> */}
      {children}
    </div>
  );
}

export default layout;
