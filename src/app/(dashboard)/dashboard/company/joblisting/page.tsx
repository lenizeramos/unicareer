"use client";
import { useEffect, useState } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import JobList from "@/app/components/JobList";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { IJob } from "@/app/Types";

export default function CompanyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [companyJobs, setCompanyJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = {
    title: "Title",
    status: "Status",
    location: "Location",
    level: "Level",
    type: "Type",
    categories: "Categories",
    closingDate: "Closing Date",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/company/get-jobs`);
        if (!response.ok) throw new Error("Failed to fetch company jobs");
        const jobs = await response.json();
        console.log(jobs, "jobs");
        setCompanyJobs(jobs);
      } catch (error) {
        console.error("Error fetching job:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = companyJobs
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((job) => ({
      ...job,
      categories: Array.isArray(job.categories)
        ? job.categories.join(", ")
        : job.categories,
    }));

  return (
    <>
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight}></div>
      <DashboardWelcome
        greeting="Job Listing"
        message="Here is your jobs listing status from July 19 - July 25."
        date="Jul 19 - Jul 25"
      />
      <JobList
        jobs={currentJobs}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={companyJobs.length}
      />
    </>
  );
}
