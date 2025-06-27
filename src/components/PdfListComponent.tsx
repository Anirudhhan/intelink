import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Trash } from "lucide-react";
import { redirect } from "next/navigation";

const PdfListComponent = ({ id, file_name, created_at }: PDFFile) => {
  const formattedDate = new Date(created_at);
  console.log(created_at);

  const deletePdf = () => {
    
  }

  return (
    <Card
      className="h-25 cursor-pointer dark:hover:bg-neutral-800 hover:bg-gray-100"
      onClick={() => redirect(`/dashboard/${id}`)}
    >
      <CardHeader>
        <CardTitle className="truncate">{file_name}</CardTitle>
        <CardDescription>{formattedDate.toLocaleString()}</CardDescription>
        <CardAction>
          <Trash className="size-5 hover:text-red-700" />
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default PdfListComponent;
