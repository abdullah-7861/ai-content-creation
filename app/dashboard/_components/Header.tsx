import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className=" p-5 shadow-sm border-b-2 flex justify-end items-center bg-white">
      <div className=" flex gap-2  items-center border rounded-md max-w-lg bg-purple-600 text-white ">
        {/* <Search/ >
        <input type="text" placeholder="Search..."
        className="outline-none" /> */}
        <Button className="bg-inherit hover:bg-purple-500">sign-out</Button>
      </div>
     
    </div>
  );
}

export default Header;
