import React from "react";

const PDFViewer = ({ file_url }: { file_url: string }) => {
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(file_url)}&embedded=true`;

  return (
    <div className="rounded-md overflow-hidden">
      {/* Large screen viewer (md and up) */}
      <div className="hidden md:block h-[calc(100vh-80px)]">
        <object
          data={`${file_url}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
          type="application/pdf"
          className="w-full h-full"
        >
          <embed
            src={`${file_url}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
            type="application/pdf"
            className="w-full h-full"
          />
        </object>
      </div>

      {/* Small screen viewer (below md) */}
      <div className="block md:hidden h-[250px]">
        <iframe
          src={googleViewerUrl}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PDFViewer;
