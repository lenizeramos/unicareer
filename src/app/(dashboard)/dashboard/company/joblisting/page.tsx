"use client";
import { useEffect, useState } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import JobList from "@/app/components/JobList";
import { useRouter } from "next/navigation";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";

const fetchCompanyJobs = async () => {
  try {
    const response = await fetch(`/api/get-company-jobs`);
    if (response.ok) {
      const jobs = await response.json();
      return jobs;
    } else {
      console.error("Failed to fetch job");
    }
  } catch (error) {
    console.error("Error fetching job:", error);
  }
};

export default function CompanyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  const columns = {
    title: "Title",
    status: "Status",
    location: "Location",
    level: "Level",
    type: "Type",
    categories: "Categories",
    closingDate: "Closing Date",
    createdAt: "Created At",
    /* applicants: "Applicants",
    needs: "Needs", */
  };

  /* const jobs = [
        {
            roles: "Software Engineer",
            status: "Live",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Fulltime",
            applicants: "10",
            needs: "9/20",
        },
        {
            roles: "Software Engineer",
            status: "Closed",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Freelance",
            applicants: "10",
            needs: "4/10",
        },
        {
            roles: "Software Engineer",
            status: "Fulltime",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Fulltime",
            applicants: "10",
            needs: "6/11",
        },
        {
            roles: "Software Engineer",
            status: "Freelance",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Freelance",
            applicants: "10",
            needs: "3/7",
        },
        {
            roles: "Software Engineer",
            status: "Freelance",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Freelance",
            applicants: "10",
            needs: "3/7",
        },
        {
            roles: "Software Engineer",
            status: "Freelance",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Freelance",
            applicants: "10",
            needs: "3/7",
        },
        {
            roles: "Software Engineer",
            status: "Freelance",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Freelance",
            applicants: "10",
            needs: "3/7",
        },
        {
            roles: "Software Engineer",
            status: "Freelance",
            datePosted: "20 May 2024",
            dueDate: "20 May 2024",
            jobType: "Freelance",
            applicants: "10",
            needs: "3/7",
        },
    ]; */

  const handleButtonClick = () => {
    router.push("/dashboard/company/postjob");
  };

  useEffect(() => {
    const getJobs = async () => {
      const fetchedJobs = await fetchCompanyJobs();
      console.log(fetchedJobs, "fetchCompanyJobs")
      if (fetchedJobs) {
        setJobs(fetchedJobs);
      }
    };
    getJobs();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

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
        totalItems={jobs.length}
      />
    </>
  );
}
