"use client";
import React from "react";
import UploadImage from "./_upload/UploadImage";
import Layers from "./_layers/layers";
import { ModeToggle } from "@/components/ui/mode-toggle";
import ActiveImage from "./_layers/active-image";
import UploadForm from "./_upload/uplood-form";
import { useLayerStore } from "@/lib/layer-store";
import ImageTools from "./_toolbar/image-toolbar";
import VideoTools from "./_toolbar/video-toolbar";

function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <div className="flex h-full">
      <div className="py-6 px-4 basis-[240px] shrink-0">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
        <div className="flex flex-col gap-4 ">
          {activeLayer.resourceType === "image" ? <ImageTools /> : null}
          {activeLayer.resourceType === "video" ? <VideoTools /> : null}
        </div>
      </div>

      <UploadForm />
      <ActiveImage />
      <Layers />
    </div>
  );
}

export default Editor;
