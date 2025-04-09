"use client";
import { useEffect, useState } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import JobList from "@/app/components/JobList";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { fetchCompanyJobs } from "@/app/context/slices/companyJobsSlice";

export default function CompanyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch: AppDispatch = useDispatch();
  const companyJobs = useSelector((state: RootState) => state.companyJobs.jobs);

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
    if (companyJobs.length === 0) {
      dispatch(fetchCompanyJobs());
    }
  }, [dispatch, companyJobs.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = companyJobs.slice(indexOfFirstItem, indexOfLastItem);

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
