import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className=" p-7f shadow-sm border-b-2 flex justify-between items-center">
      <div className="flex gap-2 items-center border rounded-md max-w-lg ">
        <Search/ >
        <input type="text" placeholder="Search..."
        className="outline-none" />
      </div>
     
    </div>
  );
}

export default Header;
