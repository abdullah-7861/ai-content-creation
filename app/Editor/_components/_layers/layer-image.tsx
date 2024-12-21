import React from "react";
import { Layer } from "@/lib/layer-store";
import Image from "next/image";

export default function LayerImage({ layer }: { layer: Layer }) {
  if (layer.url && layer.name)
    return (
      <>
        <div className=" pl-4 w-12 h-12 flex gap-2 items-center justify-center">
          <Image
            className="w-full object-contain h-full rounded-sm"
            alt={layer.name}
            src={layer.format === "mp4" ? layer.poster || layer.url : layer.url}
            width={50}
            height={50}
          />
        </div>
        <div>
          <p className="text-sm">
            {`${layer.name?.slice(0, 15)}.${layer.format}`}
          </p>
        </div>
      </>
    );
}
