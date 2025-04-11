"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { waitForUserRole } from "@/Lib/client/roleService";
import CandidateForm from "@/app/components/CandidateForm";
import CompanyForm from "@/app/components/CompanyForm";
import ResumeUploadStep from '@/app/components/ResumeUploadStep';
import { ResumeData } from '@/types/resume';

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

const awaitRoleUpdate = async (expectedRole: string, maxAttempts = 10): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch("/api/check-role");
      if (!response.ok) {
        throw new Error(`Failed to check role: ${response.statusText}`);
      }
      const data = await response.json();
      
      if (data.role === expectedRole) {
        return true;
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error("Error checking role:", error);
    }
  }
  return false;
};

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [formType, setFormType] = useState<"candidate" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const [showResumeUpload, setShowResumeUpload] = useState(true);
  const [candidateData, setCandidateData] = useState<ResumeData | null>(null);

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

        const roleUpdated = await waitForUserRole("CANDIDATE");
        if (!roleUpdated) {
          throw new Error("Role update timeout");
        }

        router.push("/dashboard/candidate");
      } catch (error) {
        console.error("Error registering the user:", error);
        setIsLoading(false);
      }
    },
    [router]
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

        const roleUpdated = await waitForUserRole("COMPANY");
        if (!roleUpdated) {
          throw new Error("Role update timeout");
        }

        router.push("/dashboard/company");
      } catch (error) {
        console.error("Error registering the user:", error);
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleResumeData = (data: ResumeData) => {
    console.log('Resume data received:', data);
    setCandidateData(data);
    setShowResumeUpload(false);
  };

  const handleSkipResume = () => {
    setShowResumeUpload(false);
  };

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
        {formType === "candidate" && showResumeUpload ? (
          <ResumeUploadStep 
            onUpload={handleResumeData}
            onSkip={handleSkipResume}
            userId={user?.id || ''}
          />
        ) : formType === "candidate" ? (
          <CandidateForm 
            onSubmit={handleCandidateFormSubmit}
            initialData={candidateData}
          />
        ) : formType === "company" ? (
          <CompanyForm onSubmit={handleCompanyFormSubmit} />
        ) : (
          <p>Invalid role or missing parameter.</p>
        )}
      </div>
    </div>
  );
}
