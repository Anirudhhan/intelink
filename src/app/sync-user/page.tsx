// app/sync-user/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function SyncUserPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }

    if (user) {
      fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
        }),
      }).finally(() => {
        router.push("/dashboard");
      });
    }
  }, [user, isLoaded, router]);

  return (
    <main className="mt-70 flex items-center justify-center">
      <div className="flex justify-center items-center flex-col gap-y-1">
        <LoaderCircle className="animate-spin text-amber-800 size-10"  />
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    </main>
  );
}
