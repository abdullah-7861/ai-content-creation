import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { genRemove } from "@/server/gen-remove";

import { Eraser } from "lucide-react";
import React, { useState } from "react";
import ActiveImage from "../_layers/active-image";

export default function GenRemove() {
  const generating = useImageStore((state) => state.generating);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const [activeTag, setActiveTag] = useState("");

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-8">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            Content Aware <Eraser size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full   ">
        <div>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Smart AI Remove</h4>
            <p className="text-sm text-muted-foreground">
              Generating Remove Any Part of the Image
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="Selection">Selection</Label>
          <Input
            className="col-span-2 h-8"
            value={activeTag}
            onChange={(e) => setActiveTag(e.target.value)}
          />
        </div>
        <Button
          onClick={async () => {
            setGenerating(true);
            const res = await genRemove({
              activeImage: activeLayer.url!,
              prompt: activeTag,
            });
            if (res?.data?.success) {
              setGenerating(false);

              const newLayerId = crypto.randomUUID();
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                name: activeLayer.name,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setActiveLayer(newLayerId);
            }
          }}
          className="w-full mt-4"
        >
          Magic Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
}
