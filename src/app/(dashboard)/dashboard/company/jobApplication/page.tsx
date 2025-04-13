"use client";
import { useState, useEffect } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import ApplicantsList from "@/app/components/ApplicantsList";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { fetchCompanyJobs } from "@/app/context/slices/companyJobsSlice";

export default function ApplicationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dispatch = useDispatch<AppDispatch>();
  const companyJobs = useSelector((state: RootState) => state.companyJobs.jobs);

  useEffect(() => {
    dispatch(fetchCompanyJobs());
  }, [dispatch]);

  const columns = {
    name: "Applicant",
    position: "Position",
    appliedDate: "Applied Date",
    status: "Status",
    actions: "Actions",
  };
  const applicants = companyJobs.flatMap((job) =>
    job.applications.map((application) => ({
      id: application.id,
      name: application.candidate
        ? `${application.candidate.firstName} ${application.candidate.lastName}`
        : `Candidate ${application.candidateId}`,
      email: application.candidate?.user.email ?? "",
      phone: "",
      position: job.title,
      appliedDate: new Date(application.appliedAt).toLocaleDateString(),
      status: application.status.toUpperCase() as
        | "PENDING"
        | "INTERVIEWED"
        | "REJECTED",
      linkedIn: "",
    }))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplicants = applicants.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight}></div>
      <DashboardWelcome
        greeting="Job Applications"
        message="Here is your applicants listing status from July 19 - July 25."
        date="Jul 19 - Jul 25"
      />
      <ApplicantsList
        applicants={currentApplicants}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={applicants.length}
      />
    </>
  );
}
