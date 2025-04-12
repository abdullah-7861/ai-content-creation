import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy, Download, DownloadIcon } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import { useParams, usePathname } from "next/navigation";

interface props {
  AiOutput: string;
  imageUrl: string;
  MusicOutput: any;
  imagePrompt: string;
}

function OutputSection({
  AiOutput,
  imageUrl,
  MusicOutput,
  imagePrompt,
}: props) {
  const editorRef: any = useRef(); // using to get access to the the html componenet or element
  console.log("this is image url", imageUrl);
  const add = usePathname();
  // console.log(add)

  useEffect(() => {
    if (add === "/dashboard/content/music-generation") {
      null;
    } else if (add === "/dashboard/content/image-generation") {
      null;
    } else {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(AiOutput);
    }
  }, [AiOutput]);

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ai-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="bg-white shadow-lg border rounded-lg  min-h-full ">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium  text-lg">Your Result</h2>
        {add === "/dashboard/content/image-generation" ? (
          <Button
            size="icon"
            variant="outline"
            onClick={handleDownload}
            className="bg-purple-600 text-white   hover:bg-purple-500 min-w-28 flex gap-1"
          >
            <DownloadIcon className="w-4 h-4 " /> Download
          </Button>
        ) : (
          <Button
            disabled={AiOutput === "" ? true : false}
            className="bg-purple-600   hover:bg-purple-500 flex gap-1"
            onClick={(e) =>
              navigator.clipboard.writeText(
                editorRef.current.getInstance().getMarkdown()
              )
            }
          >
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        )}
      </div>
      <hr />

      {add === "/dashboard/content/music-generation" ? (
        <div>
          <audio controls>
            <source src={MusicOutput} />
          </audio>
        </div>
      ) : add === "/dashboard/content/image-generation" ? (
        <Card className="   overflow-hidden flex flex-col glass ml-8 m-9 size-96">
          <div className="relative aspect-square">
            <img
              src={imageUrl}
              alt={imagePrompt}
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
      ) : (
        <div className="bg-white  p-5 whitespace-pre-wrap">
          <Editor
            ref={editorRef} // taking reference of <Editor/ > component to access
            initialValue="Your Result Will Appear Here"
            initialEditType="wysiwyg"
            height="500px"
            useCommandShortcut={true}
            // onChange={() =>
            //   console.log(editorRef.current.getInstance().getMarkdown())
            // }
          />
        </div>
        // <div
        //   className="bg-white p-5"
        //   dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        // />
      )}
    </div>
  );
}

export default OutputSection;
