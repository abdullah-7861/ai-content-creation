import React, { useEffect, useRef } from "react";
// import "@toast-ui/editor/dist/toastui-editor.css";
// import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy, DownloadIcon } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface props {
  AiOutput: string;
  ImageOutput: string;
  MusicOutput:string
}

function OutputSection({ AiOutput, ImageOutput, MusicOutput }: props) {
  const editorRef: any = useRef(); // using to get access to the the html componenet or element

  useEffect(() => {
    // const editorInstance = editorRef.current.getInstance();
    // editorInstance.setMarkdown(AiOutput); // putting value inside the output section
  }, [AiOutput]);

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
      {AiOutput === "d" ? (
        <div className="bg-white  p-5 whitespace-pre-wrap">{AiOutput}</div>
      ) : ImageOutput === "d" ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 p-5 pb-10">
          <Card className="rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={ImageOutput}
                alt="Failed To load Image"
                width={200}
                height={200}
              />
            </div>
            <CardFooter className="p-2">
              <Button
                onClick={() => window.open("/music-note.png")}
                className="w-full bg-purple-600  gap-2  hover:bg-purple-500"
              >
                <DownloadIcon className=" w-5 h-5 " />
                Download
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>
          <audio controls className="w-full mt-8">
            <source src={MusicOutput} />

          </audio>
        </div>
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
