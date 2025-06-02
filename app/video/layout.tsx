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
      <Header />

      {children}
    </div>
  );
}

export default layout;
