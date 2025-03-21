"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CandidateForm from "../components/CandidateForm";
import CompanyForm from "../components/CompanyForm";
import { useUser } from "@clerk/nextjs";

/* const awaitNewClerkRoleToSyncWithApp = async () => {
  let userRole = null;

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  let attempts = 0;
  const maxAttempts = 20;

  while (!userRole && attempts < maxAttempts) {
    if (attempts > 0) {
      //console.log("SLEEPING");
      await sleep(5000);
    }
    const roleResponse = await fetch("/api/get-role");
    if (!roleResponse.ok) {
      throw new Error(`Failed to get role: ${roleResponse.statusText}`);
    }
    userRole = await roleResponse.json();
    attempts++;
  }
}; */

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [formType, setFormType] = useState<"candidate" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (role === "candidate" || role === "company") {
      setFormType(role);
    } else {
      setFormType(null);
    }
    const setRole = async () => {
      try {
        const response = await fetch("/api/set-role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        });

        if (!response.ok) {
          throw new Error(`Failed to set role: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error setting role:", error);
      }
    };

    setRole();
  }, [role]);

  const handleCandidateFormSubmit = useCallback(
    async (candidate: {
      firstName: string;
      lastName: string;
      photo: File | null;
      role?: string;
    }) => {
      setIsLoading(true);
      try {
        candidate.role = "CANDIDATE";
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(candidate),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || `Registration error: ${response.statusText}`);
        }

        // Wait for Clerk role to be updated
        if (user) {
          await user.reload();
        }
        
        router.push("/dashboard/candidate");
      } catch (error) {
        console.error("Error registering the user:", error);
        // Add user feedback here
      } finally {
        setIsLoading(false);
      }
    },
    [router, user]
  );

  const handleCompanyFormSubmit = useCallback(
    async (company: { name: string; logo: File | null; role?: string }) => {
      setIsLoading(true);
      try {
        company.role = "COMPANY";
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(company),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || `Registration error: ${response.statusText}`);
        }

        // Wait for Clerk role to be updated
        if (user) {
          await user.reload();
        }

        router.push("/dashboard/company");
      } catch (error) {
        console.error("Error registering the user:", error);
        // Add user feedback here
      } finally {
        setIsLoading(false);
      }
    },
    [router, user]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Registration Form
        </h1>

        {formType === "candidate" && (
          <CandidateForm onSubmit={handleCandidateFormSubmit} />
        )}
        {formType === "company" && (
          <CompanyForm onSubmit={handleCompanyFormSubmit} />
        )}
        {formType === null && <p>Invalid role or missing parameter.</p>}
      </div>
    </div>
  );
}
