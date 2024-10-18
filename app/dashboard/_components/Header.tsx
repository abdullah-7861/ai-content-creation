import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className=" p-6 shadow-sm border-b-2 flex justify-end items-center">
      <UserButton />
    </div>
  );
}

export default Header;
