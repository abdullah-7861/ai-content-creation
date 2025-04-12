import React, { useEffect, useRef } from "react";
// import "@toast-ui/editor/dist/toastui-editor.css";
// import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy, DownloadIcon } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import { useParams, usePathname } from "next/navigation";

interface props {
  AiOutput: string;
  ImageOutput: string;
  MusicOutput: any;
}

function OutputSection({ AiOutput, ImageOutput, MusicOutput }: props) {
  const editorRef: any = useRef(); // using to get access to the the html componenet or element

  const add = usePathname();
  // console.log(add)

  useEffect(() => {
    // const editorInstance = editorRef.current.getInstance();
    // editorInstance.setMarkdown(AiOutput); // putting value inside the output section
  }, [AiOutput]);

  console.log("tis is music response on outputpage", MusicOutput);

  return (
    <div className="bg-white shadow-lg border rounded-lg  min-h-full ">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium  text-lg">Your Result</h2>
        <Button
          disabled={AiOutput === "" ? true : false}
          className="bg-purple-600   hover:bg-purple-500 flex gap-1"
          onClick={(e) => navigator.clipboard.writeText(AiOutput)}
        >
          <Copy className="w-4 h-4 mr-1" /> Copy
        </Button>
      </div>
      <hr />

      {add === "/dashboard/content/music-generation" ? (
        <div>
          <audio controls>
            <source src={MusicOutput} />
          </audio>
        </div>
      ) : (
        <div className="bg-white  p-5 whitespace-pre-wrap">{AiOutput}</div>
        // <div
        //   className="bg-white p-5"
        //   dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        // />
      )}

      {/* 
      <Editor
        ref={editorRef} // taking reference of <Editor/ > component to access
        initialValue="Your Result Will Appear Here"
        initialEditType="wysiwyg"
        height="500px"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      /> */}
    </div>
  );
}

export default OutputSection;
