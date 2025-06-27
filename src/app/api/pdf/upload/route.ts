// app/api/pdf/upload/route.ts

import supabase from "@/lib/supabase/server-client";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const user_id = formData.get("user_id") as string;
    const file = formData.get("file") as File;

    if (!user_id || !file) {
      return NextResponse.json(
        { error: "Missing user_id or file" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filePath = `${user_id}/${Date.now()}-${file.name}`; // 🔹 Relative path for storage

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("pdfs")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("pdfs")
      .getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl;

    // Extract PDF page count
    let pageCount = 0;
    try {
      const pdfDoc = await PDFDocument.load(fileBuffer);
      pageCount = pdfDoc.getPageCount();
    } catch (pdfError) {
      console.error("PDF parsing error:", pdfError);
    }

    // Save metadata to DB
    const { data: insertedFile, error: insertError } = await supabase
      .from("files")
      .insert({
        user_id,
        file_name: file.name,
        file_url: publicUrl,
        file_path: filePath, 
        page_count: pageCount,
      })
      .select("id")
      .single();

    if (insertError || !insertedFile) {
      console.error("DB insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to insert metadata" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: insertedFile.id });
  } catch (err) {
    console.error("Unhandled upload error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
