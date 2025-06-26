// app/api/create-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase/server-client";

export async function POST(req: NextRequest) {
  const { id, full_name, email } = await req.json();

  if (!id || !full_name || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .upsert({ id, full_name, email }, { onConflict: "id" });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
