"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Image, ImageOff, Paintbrush } from "lucide-react";
import { useLayerStore } from "@/lib/layer-store";
import { toast } from "sonner";
import { useImageStore } from "@/lib/image-store";
import { Button } from "@/components/ui/button";
import { bgRemoval } from "@/server/bg-remove";
import { useState } from "react";
import { bgReplace } from "@/server/bg-replace";

export default function BackgroundReplace() {
  const tags = useImageStore((state) => state.tags);
  const setActiveTag = useImageStore((state) => state.setActiveTag);
  const activeTag = useImageStore((state) => state.activeTag);
  const setActiveColor = useImageStore((state) => state.setActiveColor);
  const activeColor = useImageStore((state) => state.activeColor);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const layers = useLayerStore((state) => state.layers);
  const generating = useImageStore((state) => state.generating);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const [prompt, setPrompt] = useState("");

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="py-8">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            BG Replace
            <ImageOff size={18} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Generative Background Replace
            </h4>
            <p className="text-sm max-w-xs text-muted-foreground">
              Replace Background with AI Generated One.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe new background for this image"
            />
          </div>
        </div>

        <Button
          disabled={!activeLayer?.url || generating}
          className="w-full mt-4"
          onClick={async () => {
            setGenerating(true);
            const res = await bgReplace({
              activeImage: activeLayer.url!,
              prompt: prompt,
            });
            if (res?.data?.success) {
              const newLayerId = crypto.randomUUID();
              addLayer({
                id: newLayerId,
                name: "bg-replaced" + activeLayer.name,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                url: res.data.success,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setGenerating(false);
              setActiveLayer(newLayerId);
            }
            if (res?.serverError) {
              toast.error(res.serverError);
              setGenerating(false);
            }
          }}
        >
          {generating ? "Generating..." : "Replace Background"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
