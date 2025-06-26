"use client";
import React, { useEffect, useState } from "react";

interface PdfListProps {
  id: string;
}

const PdfList = ({ id }: PdfListProps) => {
  const [pdfs, setPdfs] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchPDFs = async () => {
      try {
        const res = await fetch("/api/fetch-pdfs", {
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
      }
    };

    fetchPDFs();
  }, [id]);

  return (
    <div>
      <h2>PDF List</h2>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>{pdf.file_name || "Unnamed PDF"}</li>
        ))}
      </ul>
    </div>
  );
};

export default PdfList;