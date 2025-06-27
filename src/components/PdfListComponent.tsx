"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LoaderCircle, Trash } from "lucide-react";
import { toast } from "sonner";

interface PdfListComponentProps extends PDFFile {
  onDelete: () => void;
}

const PdfListComponent = ({
  id,
  file_name,
  created_at,
  user_id,
  onDelete,
}: PdfListComponentProps) => {
  const formattedDate = new Date(created_at);
  const [isDeleting, setIsDeleting] = useState(false);

  console.log(id, formattedDate);

  const deletePdf = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this PDF?");
    if (!confirmDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch("/api/pdf/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, user_id }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Deletion failed");
        return;
      }

      toast.success("PDF deleted successfully");

      onDelete();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="h-25 cursor-pointer dark:hover:bg-neutral-800 hover:bg-gray-100">
      <CardHeader>
        <CardTitle className="truncate">{file_name}</CardTitle>
        <CardDescription>{formattedDate.toLocaleString()}</CardDescription>
        <CardAction>
          {isDeleting ? (
            <LoaderCircle className="size-5 text-red-700 animate-spin" />
          ) : (
            <Trash className="size-5 hover:text-red-700" onClick={deletePdf} />
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default PdfListComponent;
