"use client";
import { useEffect, useState } from "react";
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [role, setRole] = useState<"company" | "candidate" | "">("");
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
 }, [isSignedIn, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold">Select Your Role</h2>
      <div className="flex gap-4">
        {["company", "candidate"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r as "company" | "candidate")}
            className={`px-4 py-2 rounded border ${
              role === r ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        forceRedirectUrl={`/register?role=${role}`}
      />
    </div>
  );
};

export default SignUpPage;
