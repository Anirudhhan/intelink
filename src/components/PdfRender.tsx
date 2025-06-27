"use client";
import React from "react";

const PDFViewer = ({ file_url }: { file_url: string }) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="rounded-3xl bg-gray-100 h-96 md:h-[720px]">
        <iframe
          src={`${file_url}#view=Fits`}
          className="w-full h-full border-0"
          title="PDF Document"
          onError={() => console.error("Failed to load PDF")}
        />
      </div>
    </div>
  );
};

export default PDFViewer;
