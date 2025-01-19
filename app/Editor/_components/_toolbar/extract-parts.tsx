import { Button } from "@/components/ui/button";
import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { extractBackground } from "@/server/extract-parts";
import { Scissors } from "lucide-react";
import { useState } from "react";

export default function ExtractBackground() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const generating = useImageStore((state) => state.generating);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      <Button
        disabled={!activeLayer?.url || generating}
        variant="outline"
        className="py-8 w-full"
        onClick={async () => {
          if (!activeLayer) return;
          setGenerating(true);
          setErrorMessage(null);

          try {
            const res = await extractBackground({
              activeImage: activeLayer.url!,
              format: activeLayer.format!,
            });

            if (res?.data?.success) {
              const newLayerId = crypto.randomUUID();
              addLayer({
                id: newLayerId,
                name: "background-" + activeLayer.name,
                format: ".png",
                height: activeLayer.height,
                width: activeLayer.width,
                url: res.data.success,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setActiveLayer(newLayerId);
            } else {
              setErrorMessage("Failed to extract background.");
            }
          } catch (error) {
            setErrorMessage("An error occurred while processing the image.");
            console.error(error);
          } finally {
            setGenerating(false);
          }
        }}
      >
        {generating ? "Extracting Background..." : "Extract Background"}
      </Button>
      {errorMessage && (
        <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
