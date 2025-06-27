// app/api/pdf/delete/route.ts

import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase/server-client";

export async function POST(req: NextRequest) {
  try {
    const { id, user_id } = await req.json();

    if (!id || !user_id) {
      return NextResponse.json(
        { error: "Missing id or user_id" },
        { status: 400 }
      );
    }

    // Step 1: Get file metadata (including file_path)
    const { data: fileData, error: fetchError } = await supabase
      .from("files")
      .select("file_path, user_id")
      .eq("id", id)
      .single();

    if (fetchError || !fileData) {
      return NextResponse.json(
        { error: "PDF not found or fetch failed" },
        { status: 404 }
      );
    }

    // Step 2: Access control check
    if (fileData.user_id !== user_id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Step 3: Delete from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("pdfs")
      .remove([fileData.file_path]); // file_path (e.g., "user_xxx/filename.pdf")

    if (storageError) {
      return NextResponse.json(
        { error: "Failed to delete from storage" },
        { status: 500 }
      );
    }

    // Step 4: Delete DB record
    const { error: deleteError } = await supabase
      .from("files")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id);

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to delete from database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "PDF deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unhandled deletion error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
