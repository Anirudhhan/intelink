"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const UploadDropZone = () => {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [acceptedFile, setAcceptedFile] = useState<File | null>(null);
  const router = useRouter(); 

  const startSimulatedProgress = () => {
    setUploadingProgress(0);

    const intervel = setInterval(() => {
      setUploadingProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(intervel);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);
    return intervel;
  };

  const uploadFile = async (file: File): Promise<Response> => {
    const formData = new FormData();
    formData.append("user_id", user!.id);
    formData.append("file", file);

    return fetch("/api/upload-pdf", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <Dropzone
      multiple={false}
      accept={{ "application/pdf": [] }}
      onDrop={async (file, fileRejections) => {

        if (fileRejections.length > 0) {
          toast.error("Only PDF files are allowed.");
          return;
        }
        setAcceptedFile(file[0]); 
        setIsUploading(true);

        const progressIntervel = startSimulatedProgress();

        const res = await uploadFile(file[0]);
        const json = await res.json();

        if (!res.ok) {
          toast.error(json.error || "Upload failed");
          clearInterval(progressIntervel);
          setIsUploading(false);
          setAcceptedFile(null);
          return;
        }

        clearInterval(progressIntervel);
        setUploadingProgress(100);
        setAcceptedFile(null);
        router.push(`/dashboard/${json.id}`);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-64 m-4 flex items-center justify-center cursor-pointer transition-colors dark:hover:border-amber-700 hover:border-amber-700"
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center w-full h-full px-4 text-center">
            {/* Icon + instructions */}
            <Cloud className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-3 animate-bounce" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-amber-800 dark:text-amber-700">
                Click to upload
              </span>{" "}
              or drag & drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF file up to 4MB
            </p>

            {/* File info */}
            {acceptedFile && (
              <div className="mt-4 px-1 w-full max-w-xs flex items-center rounded-md overflow-hidden bg-white dark:bg-neutral-800 shadow-sm border border-zinc-200 dark:border-zinc-700">
                <div className="p-2 bg-blue-50 dark:bg-blue-900 grid place-items-center rounded-lg">
                  <File className="h-4 w-4 text-blue-500" />
                </div>
                <div className="px-3 py-2 text-sm text-left text-gray-800 dark:text-gray-100 truncate w-50 sm:w-full">
                  {acceptedFile.name}
                </div>
              </div>
            )}

            {/* Progress */}
            {isUploading && (
              <div className="w-full mt-4 max-w-xs">
                <Progress
                  value={uploadingProgress}
                  className="h-2 bg-zinc-200 dark:bg-zinc-700"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                  {uploadingProgress < 100 ? (
                    uploadingProgress < 90 ? (
                      <>Uploading… {uploadingProgress}%</>
                    ) : (
                      <>Finishing up…</>
                    )
                  ) : (
                    <>Redirecting…</>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-amber-600 border-amber-700 hover:text-white hover:bg-amber-900 text-lg py-5 cursor-pointer"
        >
          Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Upload PDF</DialogTitle>
        <UploadDropZone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
