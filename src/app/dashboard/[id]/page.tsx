// app/dashboard/[id]/page.tsx
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import supabase from "@/lib/supabase/server-client";

interface Props {
  params: Promise<{ id: string }>; // mark params as Promise
}

export default async function Page({ params }: Props) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id: fileId } = await params; // ✅ await here

  const { data, error } = await supabase
    .from("files")
    .select("user_id, file_name")
    .eq("id", fileId)
    .single();

  if (error || !data || data.user_id !== user.id) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to PDF Chat</h1>
      <p className="text-gray-600 mt-2">File: {data.file_name}</p>
    </div>
  );
}
