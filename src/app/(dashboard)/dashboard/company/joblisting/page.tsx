"use client";
import { useEffect, useState } from "react";
import { styles } from "@/app/styles";
import JobList from "@/app/components/JobList";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { IJob } from "@/app/Types";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";

export default function CompanyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [companyJobs, setCompanyJobs] = useState<IJob[]>([]);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

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
    let queryParams = "";
    if (startDate && endDate) {
      queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    const fetchCompanyJobs = async () => {
      try {
        const response = await fetch(`/api/company/get-jobs${queryParams}`);
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
            Below is a list of all the jobs you have posted{" "}
            {startDate && endDate && (
              <>
                from {getDate(startDate)} - {getDate(endDate)}
              </>
            )}
          </p>
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

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
