"use client";
import React from "react";
import UploadImage from "./_upload/UploadImage";
import Layers from "./_layers/layers";
import { ModeToggle } from "@/components/ui/mode-toggle";
import ActiveImage from "./_layers/active-image";

function Editor() {
  return (
    <div className="flex h-full">
      <div className="py-6 px-4 basis-[240px] shrink-0">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
      </div>

      <UploadImage />
      <ActiveImage />
      <Layers />
    </div>
  );
}

export default Editor;
