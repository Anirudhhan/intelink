import PdfListView from "@/components/PdfListView";
import UploadButton from "@/components/UploadButton";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

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
      
      <PdfListView id={user.id}/>
    </main>
  );
};

export default dashboard;
