"use client";
import { styles } from "@/app/styles";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import JobForm from "@/app/components/JobForm";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/app/context/store";
import { IJob } from "@/app/Types";

export default function PostJobPage() {
  const router = useRouter();
  const jobToEdit = useSelector(
    (state: RootState) => state.jobToEdit.jobToEdit
  );
  const pageTitle = "Job Information";
  const previousPage = jobToEdit
    ? `/dashboard/company/jobdetails/${jobToEdit.id}`
    : "/dashboard/company/joblisting";

  const handleJobSubmit = useCallback(
    async (job: IJob) => {
      try {
        let url = "/api/job/create";
        let method = "POST";
        let message = "You've successfully posted a job!";

        if (jobToEdit) {
          url = `/api/job/${jobToEdit.id}/update`;
          method = "PATCH";
          message = "You've successfully updated a job!";
        }

        const { salary, ...rest } = job;
        const body = JSON.stringify({
          ...rest,
          salaryMin: salary?.[0] ?? null,
          salaryMax: salary?.[1] ?? null,
        });

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: body,
        });

        if (!response.ok) {
          if (response.status === 403) {
            toast.error("You cannot update a job that has applications.", {
              duration: 2000,
              position: "top-center",
              style: {
                background: "#ff6b6b4a",
                fontFamily: "fantasy",
                fontSize: "1rem",
                borderRadius: "8px",
                letterSpacing: "0.5px",
              },
            });
            setTimeout(() => {
              router.push(previousPage);
            }, 2500);
          }
          throw new Error(`Error: ${response.statusText}`);
        }
        toast.success(message, {
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
          router.push(previousPage);
        }, 2500);
      } catch (error) {
        console.error(
          `Error ${jobToEdit ? "update" : "create"} the job:`,
          error
        );
      }
    },
    [router, jobToEdit, previousPage]
  );
  return (
    <>
      <CompanyHeaderPaymentButton isDashboard={false} pageName="Post a Job" />
      <div className={styles.borderBottomLight}></div>

      <Link
          href={previousPage}
          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-6 pt-8 pb-2"
        >
          <GoArrowLeft className="text-xl mr-2" />
          <span className="text-xl font-semibold font-monomakh">{pageTitle}</span>
        </Link>

      <JobForm onClick={handleJobSubmit} initialData={jobToEdit || undefined} />
    </>
  );
}
