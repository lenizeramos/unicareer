"use client";
import { useState, useEffect } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import ApplicationsList from "@/app/components/ApplicationsList";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useRouter } from "next/navigation";
import { IJob } from "@/app/Types";

export default function ApplicationsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [companyJobs, setCompanyJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);

  const handleViewProfile = (id: string) => {
    router.push(`/dashboard/company/applicantdetails/${id}`);
  };

  const columns = {
    name: "Applicant",
    position: "Position",
    appliedDate: "Applied Date",
    status: "Status",
    actions: "Actions",
  };

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/get-company-jobs`);
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

  const applications = companyJobs.flatMap((job) =>
    job.applications.map((application) => ({
      id: application.id,
      name: application.candidate
        ? `${application.candidate.firstName} ${application.candidate.lastName}`
        : `Candidate ${application.candidateId}`,
      email: application.candidate?.user?.email ?? "",
      phone: "",
      position: job.title,
      appliedDate: new Date(application.appliedAt).toLocaleDateString(),
      status: application.status?.toUpperCase() as
        | "PENDING"
        | "INTERVIEWED"
        | "REJECTED",
      linkedIn: "",
    }))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = applications.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight}></div>
      <DashboardWelcome
        greeting="Job Applications"
        message="Here is your applications listing status from July 19 - July 25."
        date="Jul 19 - Jul 25"
      />
      <ApplicationsList
        applications={currentApplications}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={applications.length}
        onViewProfile={handleViewProfile}
      />
    </>
  );
}
