"use client";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import JobForm from "@/app/components/JobForm";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();

  const handlePostJobSubmit = useCallback(
    async (job: {
      title: string;
      description: string;
      location?: string;
      skills: string[];
      jobType?: string;
      salaryMin?: number;
      salaryMax?: number;
      responsibilities?: string;
      whoYouAre?: string;
      niceToHave?: string;
      benefits?: string[];
      closingDate?: string;
    }) => {
      console.log(job, "JOBBBBBBBBBBB");
      try {
        const response = await fetch("/api/post-job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });

        if (!response.ok) {
          throw new Error(`Registration error: ${response.statusText}`);
        }

        router.push("/dashboard/company/joblisting");
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
      <div>POST A JOB</div>
      <JobForm onClick={handlePostJobSubmit} />
    </>
  );
}
