"use client";

import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Trash } from "lucide-react";
import { toast } from "sonner";


const PdfListComponent = ({ id, file_name, created_at, user_id }: PDFFile) => {
  const formattedDate = new Date(created_at);

  console.log(id, formattedDate);

  const deletePdf = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this PDF?");
    if (!confirmDelete) return;

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

      // Optional: Refresh page or call a prop to update state
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="h-25 cursor-pointer dark:hover:bg-neutral-800 hover:bg-gray-100">
      <CardHeader>
        <CardTitle className="truncate">{file_name}</CardTitle>
        <CardDescription>{formattedDate.toLocaleString()}</CardDescription>
        <CardAction>
          <Trash className="size-5 hover:text-red-700" onClick={deletePdf} />
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default PdfListComponent;
