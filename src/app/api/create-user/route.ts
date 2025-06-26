// app/api/create-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase/server-client";


export async function POST(req: NextRequest) {
  const { id, first_name, last_name } = await req.json();

  if (!id || !first_name || !last_name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .upsert({ id, first_name, last_name }, { onConflict: "id" });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
