"use client";
import React from "react";

const PDFViewer = ({ file_url }: { file_url: string }) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="rounded-3xl h-96 md:h-[720px]">
        <object
          data={`${file_url}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
          type="application/pdf"
          className="w-full h-full rounded-3xl"
          style={{ minHeight: '100%' }}
        >
          <embed
            src={`${file_url}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
            type="application/pdf"
            className="w-full h-full rounded-3xl"
            style={{ minHeight: '100%' }}
          />
        </object>
      </div>
    </div>
  );
};

export default PDFViewer;