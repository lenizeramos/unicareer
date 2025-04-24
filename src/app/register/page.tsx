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
import { ICompany } from "../Types/slices";
import { CandidateFormData } from "@/app/Types/index"

function RegisterContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [formType, setFormType] = useState<"candidate" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [showResumeUpload, setShowResumeUpload] = useState(true);
  const [candidateData, setCandidateData] = useState<ResumeData | null>(null);
  const [candidateId, setCandidateId] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");

  const setRole = useCallback(async () => {
    if (!user || !user.id || !role) {
      return;
    }

    try {
      setIsLoading(true);
      
      const existingUser = await getUserByClerkId(user.id);

      if (existingUser?.role?.toLowerCase() === role.toLowerCase()) {
        if (existingUser.candidate?.id) {
          setCandidateId(existingUser.candidate.id);
        } else if (existingUser.company?.id) {
          setCompanyId(existingUser.company.id);
        }
        return;
      }

      if (role === "company") {          
        if (!existingUser) {
          const response = await createUserAndCompany({
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            role: "COMPANY",
            image_url: user.imageUrl,
            name: "",
            bio: "",
            logo: undefined
          });
          setCompanyId(response.company.id);
        } else if (existingUser.company?.id) {
          setCompanyId(existingUser.company.id);
        }
      } else if (role === "candidate") {
        if (!existingUser) {
          const response = await createUserAndCandidate({
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            role: "CANDIDATE",
            image_url: user.imageUrl,
            firstName: "",
            lastName: "",
            resume: undefined,
            userId: user.id,
            skills: []
          });
          setCandidateId(response.candidate.id);
        } else if (existingUser.candidate?.id) {
          setCandidateId(existingUser.candidate.id);
        }
      }

      await setUserRole(role);
    } catch (error) {
      console.error("Error in setRole:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, role]);

  useEffect(() => {
    if (role === "candidate" || role === "company") {
      setFormType(role);
    } else {
      setFormType(null);
    }

    if (user && ((role === "candidate" && !candidateId) || (role === "company" && !companyId))) {
      setRole();
    }
  }, [user, role, setRole, candidateId, companyId]);

  const handleCandidateFormSubmit = useCallback(
    async (candidate: {
      firstName: string;
      lastName: string;
      photo?: File | null;
    }) => {
      setIsLoading(true);
      try {
        await registerCandidate({
          ...candidate,
          photo: candidate.photo || null
        });
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
    async (company: ICompany) => {
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

  if (!isLoaded) {
    return <Loader />;
  }
  
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
        {formType === "candidate" && showResumeUpload && user?.emailAddresses[0]?.emailAddress && candidateId ? (
          <ResumeUploadStep 
            onUpload={handleResumeData}
            onSkip={handleSkipResume}
            userId={candidateId}
            userEmail={user.emailAddresses[0].emailAddress}
          />
        ) : formType === "candidate" ? (
          <CandidateForm 
            onSubmit={handleCandidateFormSubmit}
            initialData={{
              ...candidateData,
              id: candidateId,
              //email: user?.emailAddresses[0]?.emailAddress
            } as CandidateFormData}
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
