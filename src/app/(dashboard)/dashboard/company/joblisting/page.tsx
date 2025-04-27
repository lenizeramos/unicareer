"use client";
import { useEffect, useState } from "react";
import { styles } from "@/app/styles";
import JobList from "@/app/components/JobList";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { IJob } from "@/app/Types";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";
import { useRouter } from "next/navigation";

export default function CompanyPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [companyJobs, setCompanyJobs] = useState<IJob[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const handleViewJobDetails = (id: string) => {
    router.push(`/dashboard/company/jobdetails/${id}`);
  };

  const columns = {
    title: "Title",
    status: "Status",
    location: "Location",
    level: "Level",
    type: "Type",
    categories: "Category",
    closingDate: "Closing Date",
    createdAt: "Created At",
    actionButton: "Actions",
  };

  useEffect(() => {
    
    const fetchCompanyJobs = async () => {
      try {

        const params = new URLSearchParams({
          skip: ((currentPage - 1) * itemsPerPage).toString(),
          take: itemsPerPage.toString(),
        });

        if (startDate && endDate) {
          params.append("startDate", startDate.toISOString());
          params.append("endDate", endDate.toISOString());
        }

        const response = await fetch(`/api/company/jobs?${params.toString()}`);

        if (!response.ok) throw new Error("Failed to fetch company jobs");
        const {jobs, totalJobs} = await response.json();

        setCompanyJobs(jobs);
        setTotalJobs(totalJobs)
      } catch (error) {
        console.error("Error fetching job:", error);
        throw error;
      }
    };
    fetchCompanyJobs();
  }, [startDate, endDate, currentPage, itemsPerPage]);

  const getDate = (date: Date | undefined | null) => {
    if (!date) {
      return;
    }
    const createDate = date;

    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };
  const isSameDate =
    endDate?.getDate() === startDate?.getDate() &&
    endDate?.getMonth() === startDate?.getMonth() &&
    endDate?.getFullYear() === startDate?.getFullYear();

  return (
    <>
      <CompanyHeaderPaymentButton isDashboard={false} pageName="Job Listing" />
      <div className={styles.borderBottomLight}></div>

      <div className="flex xs:flex-row flex-col gap-y-5 justify-between xs:items-center border border-gray-200 px-5 py-8 w-full">
        <div>
          {!isSameDate ? (
            <p className={`${styles.JobDescriptionText}`}>
              Manage and track your posted jobs{" "}
              {startDate && endDate && (
                <>
                  from {getDate(startDate)} - {getDate(endDate)}
                </>
              )}
            </p>
          ) : (
            <p className={`${styles.JobDescriptionText}`}>
              Manage and track your posted jobs{" "}
              {startDate && <>in {getDate(startDate)}</>}
            </p>
          )}
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      <JobList
        jobs={companyJobs}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setCurrentPage(1);
          setItemsPerPage(value);
        }}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={totalJobs}
        onViewJobDetails={handleViewJobDetails}
      />
    </>
  );
}
