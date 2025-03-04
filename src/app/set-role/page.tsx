"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SetRolePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    const setRole = async () => {
      await fetch("/api/set-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      router.push("/dashboard");
    };

    setRole();
  }, [router, role]);

  return <p>Definindo sua role...</p>;
}
