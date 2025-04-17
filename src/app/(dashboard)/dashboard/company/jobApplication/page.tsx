"use client";
import { useState, useEffect } from "react";
import { styles } from "@/app/styles";
import ApplicationsList from "@/app/components/ApplicationsList";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useRouter } from "next/navigation";
import { IJob } from "@/app/Types";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";

export default function ApplicationsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [companyJobs, setCompanyJobs] = useState<IJob[]>([]);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

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
    let queryParams = "";
    if (startDate && endDate) {
      queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    const fetchCompanyJobs = async () => {
      try {
        const response = await fetch(`/api/get-company-jobs${queryParams}`);
        if (!response.ok) throw new Error("Failed to fetch company jobs");
        const jobs = await response.json();
        console.log(jobs, "jobs");
        setCompanyJobs(jobs);
      } catch (error) {
        console.error("Error fetching job:", error);
        throw error;
      } 
    };
    fetchCompanyJobs();
  }, [startDate, endDate]);


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
  const currentApplications = applications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const getDate = (date: Date | undefined | null) => {
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = date;
    console.log(createDate.toUTCString(), "createDateeeee");
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };

  return (
    <>
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight}></div>

      <div className="flex xs:flex-row flex-col gap-y-5 justify-between xs:items-center border border-gray-200 px-5 py-8 w-full">
        <div>
          <p className={`${styles.JobDescriptionText}`}>
            Below is a list of all applications you have received:{" "}
            {startDate && endDate && (
              <>
                from {getDate(startDate)} - {getDate(endDate)}
              </>
            )}
          </p>
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

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
