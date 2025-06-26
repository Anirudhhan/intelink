// app/sync-user/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

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
          full_name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
          email: user.emailAddresses[0].emailAddress,
        }),
      }).finally(() => {
        router.push("/dashboard");
      });
    }
  }, [user, isLoaded, router]);

  return (
    <main className="mt-15 wrapper">
      <Skeleton
        height={100}
        count={6}
        className="dark:opacity-5 animate-pulse"
      />
    </main>
  );
}
