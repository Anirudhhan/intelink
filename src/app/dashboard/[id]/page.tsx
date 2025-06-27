// app/dashboard/[id]/page.tsx
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import supabase from "@/lib/supabase/server-client";
import PdfRender from "@/components/PdfRender";
import ChatWrapper from "@/components/ChatWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id: fileId } = await params;

  const { data, error } = await supabase
    .from("files")
    .select("user_id, file_name, file_url")
    .eq("id", fileId)
    .single();

  if (error || !data || data.user_id !== user.id) {
    return redirect("/");
  }

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRender file_url={data.file_url} /> 
          </div>
        </div>
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-2 lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
}
