import PdfList from "@/components/PdfList";
import UploadButton from "@/components/UploadButton";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
// import Skeleton from "react-loading-skeleton";

const dashboard = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="wrapper mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-300 dark:border-gray-700 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl">My Files</h1>
        <UploadButton />
      </div>

      <div className="text-center mb-8 mt-30">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-300 rounded-full flex items-center justify-center">
          <FileText className="text-gray-400 animate-pulse dark:text-gray-700" size={32} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white/80 mb-2">
          No PDF uploaded
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Upload a PDF file to get started</p>
      </div>
      <PdfList id={user.id}/>
      {/* <Skeleton height={100} count={3} className="dark:opacity-5 animate-pulse"/> */}
    </main>
  );
};

export default dashboard;
