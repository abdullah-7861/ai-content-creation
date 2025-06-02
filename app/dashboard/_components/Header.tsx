"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Loader2Icon, LogIn, LogOut, LogOutIcon, Sparkles } from "lucide-react";

import React, { useState } from "react";

function Header() {
  const [click, setClick] = useState(false);
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a className="flex items-center space-x-3" href="/">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Content Studio
          </h1>
        </a>

        <div className="flex items-center space-x-4">
          <Button
            onClick={(e) => setClick(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2 rounded-md transition-all"
          >
            {click && <Loader2Icon className="animate-spin" />}
            <SignOutButton />
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;

{
  /* <div className=" p-6 shadow-sm border-b-2 flex justify-end items-center bg-white ">
      <Button
        disabled={click}
        onClick={(e) => setClick(true)}
        className="bg-purple-700 hover:bg-purple-600 "
      >
        {click && <Loader2Icon className="animate-spin" />}
        <SignOutButton />
        <LogOut />
      </Button>
    </div> */
}
