"use client";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import JobForm from "@/app/components/JobForm";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link';

export default function PostJobPage() {
  const router = useRouter();

  const handlePostJobSubmit = useCallback(
    async (job: {
      title: string;
      description: string;
      location?: string;
      skills: string[];
      jobType?: string;
      salary?: number[];
      responsibilities?: string;
      whoYouAre?: string;
      niceToHave?: string;
      benefits?: string[];
      closingDate?: string;
    }) => {
      console.log(job, "JOBBBBBBBBBBB");

      try {
        const response = await fetch("/api/create-job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...job, salaryMin: job.salary ? job.salary[0] : null, salaryMax: job.salary ? job.salary[1] : null}),
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

      <Link href="/dashboard/company/joblisting"><div className="flex items-center text-2xl space-x-2">
  <GoArrowLeft className="text-xl" />
  <p>Post a Job</p>
</div></Link>
      
      <JobForm onClick={handlePostJobSubmit} />
    </>
  );
}
