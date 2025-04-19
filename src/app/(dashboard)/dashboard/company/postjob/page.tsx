"use client";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import JobForm from "@/app/components/JobForm";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/app/context/store";

export default function PostJobPage() {
  const router = useRouter();
  const jobToEdit = useSelector(
    (state: RootState) => state.jobToEdit.jobToEdit
  );
  const pageTitle = jobToEdit ? "Edit Job" : "Post a Job";

  const handlePostJobSubmit = useCallback(
    async (job: {
      title: string;
      closingDate: Date | null;
      level: string;
      type?: string;
      salary?: number[];
      categories: string;
      skills: string[];
      description: string;
      location?: string;
      responsibilities?: string;
      whoYouAre?: string;
      niceToHave?: string;
      benefits?: string[];
    }) => {
      try {
        const response = await fetch("/api/create-job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...job,
            salaryMin: job.salary ? job.salary[0] : null,
            salaryMax: job.salary ? job.salary[1] : null,
          }),
        });

        if (!response.ok) {
          throw new Error(`Registration error: ${response.statusText}`);
        }
        toast.success("You've successfully posted a job!", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#6f66ff4a",
            fontFamily: "fantasy",
            fontSize: "1rem",
            borderRadius: "8px",
            letterSpacing: "0.5px",
          },
        });
        setTimeout(() => {
          router.push("/dashboard/company/joblisting");
        }, 2500);
      } catch (error) {
        console.error("Error creating the job:", error);
      }
    },
    [router]
  );
  return (
    <>
      <CompanyHeader image="/img/company_logo.png" name="Nomad" />
      <div className={styles.borderBottomLight}></div>

      <Link href="/dashboard/company/joblisting">
        <div className="flex items-center text-2xl space-x-2">
          <GoArrowLeft className="text-xl" />
          <p>{pageTitle}</p>
        </div>
      </Link>

      <JobForm
        onClick={handlePostJobSubmit}
        initialData={jobToEdit || undefined}
      />
    </>
  );
}
