"use client";
import { FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import PdfListComponent from "./PdfListComponent";

interface PdfListProps {
  id: string;
}

const PdfList = ({ id }: PdfListProps) => {
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  const [pdfsIsLoading, setPdfsIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPDFs = async () => {
      try {
        const res = await fetch("/api/pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: id }),
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "Failed to fetch PDFs");
        }

        setPdfs(json.files);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
        setPdfsIsLoading(false);
      }
    };
    fetchPDFs();
  }, [id]);

  return (
    <section className="mt-10">
      <div className="grid grid-cols-4 items-center gap-4">
        {pdfs.map((pdf, index) => (
            <PdfListComponent key={index} id={pdf.id} file_name={pdf.file_name} created_at={pdf.created_at}/>
        ))}
      </div>
        {/* if no pdf list is there */}
        {pdfs.length === 0 && !pdfsIsLoading && (
          <div className="text-center mb-8 mt-30">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-300 rounded-full flex items-center justify-center">
              <FileText
                className="text-gray-400 animate-pulse dark:text-gray-700"
                size={32}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/80 mb-2">
              No PDF uploaded
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Upload a PDF file to get started
            </p>
          </div>
        )}
        {/* loading skeleton */}
        {pdfsIsLoading && (
          <Skeleton
            height={100}
            count={3}
            className="dark:opacity-5 animate-pulse"
          />
        )}
    </section>
  );
};

export default PdfList;
