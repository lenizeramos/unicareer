"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import CandidateForm from "@/app/components/CandidateForm";
import CompanyForm from "@/app/components/CompanyForm";
import ResumeUploadStep from '@/app/components/ResumeUploadStep';
import { ResumeData } from '@/types/resume';
import Loader from "@/app/components/Loader";
import { 
  getUserByClerkId,
  createUserAndCandidate,
  createUserAndCompany,
  setUserRole,
  registerCandidate,
  registerCompany,
  waitForUserRole
} from "@/Lib/client/usersService";

function RegisterContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [formType, setFormType] = useState<"candidate" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const [showResumeUpload, setShowResumeUpload] = useState(true);
  const [candidateData, setCandidateData] = useState<ResumeData | null>(null);

  useEffect(() => {
    console.log("Register API called");
    if (role === "candidate" || role === "company") {
      setFormType(role);
    } else {
      setFormType(null);
    }
    const setRole = async () => {
      try {
        if (!user) return;
        
        setIsLoading(true);
        
        // Check if user exists
        const existingUser = await getUserByClerkId(user.id);

        if (role === "company" && user) {          
          if (!existingUser) {
            await createUserAndCompany({
              id: user.id,
              email: user.emailAddresses[0]?.emailAddress || "",
              role: "COMPANY",
              image_url: user.imageUrl,
              name: "",
              bio: "",
              logo: undefined
            });
          }
        } else if (role === "candidate" && user) {
          if (!existingUser) {
            await createUserAndCandidate({
              id: user.id,
              email: user.emailAddresses[0]?.emailAddress || "",
              role: "CANDIDATE",
              image_url: user.imageUrl,
              firstName: "",
              lastName: "",
              resume: null
            });
          }
        }

        if (!role) return;
        await setUserRole(role);
      } catch (error) {
        console.error("Error setting role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      setRole();
    }
  }, [role, user]);

  const handleCandidateFormSubmit = useCallback(
    async (candidate: {
      firstName: string;
      lastName: string;
      photo: File | null;
    }) => {
      setIsLoading(true);
      try {
        await registerCandidate(candidate);
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
    async (company: { name: string; logo: string | null; bio: string }) => {
      setIsLoading(true);
      try {
        await registerCompany(company);
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
    setCandidateData(data);
    setShowResumeUpload(false);
  };

  const handleSkipResume = () => {
    setShowResumeUpload(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-4 flex flex-col items-center justify-center">
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

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen h-screen"><Loader /></div>}>
      <RegisterContent />
    </Suspense>
  );
}
