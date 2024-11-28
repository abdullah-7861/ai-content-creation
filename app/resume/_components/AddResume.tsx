"use client";
import { Loader2Icon, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeTable } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    await SaveResume(resumeTitle, uuid);
    router.push('/resume/createresume/' + uuid + '/edit');
    setLoading(false);
  };

  const SaveResume = async (resumeTitle: string, uuid: string) => {
    const result = await db.insert(ResumeTable).values({
      resumeid: uuid as string,
      title: resumeTitle,
      createdBy: user?.username as string,
      createdAt: moment().format("DD/MM/YY"),
    });
    // console.log(result);
  };
  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer "
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2 "
                placeholder="Ex. Full stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                className="bg-purple-700 hover:bg-purple-600 text-white"
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2Icon className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
