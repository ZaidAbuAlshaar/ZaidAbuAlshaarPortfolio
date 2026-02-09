"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(222,47%,6%)] text-white">
      <p>Redirecting...</p>
    </div>
  );
}
