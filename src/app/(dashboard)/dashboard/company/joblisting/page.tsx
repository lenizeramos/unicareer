'use client';
import { useState } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import { FaPlus } from "react-icons/fa";
import JobList from "@/app/components/JobList";
import { useRouter } from "next/navigation";

export default function CompanyPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const router = useRouter();

    const columns = {
        roles: "Roles",
        status: "Status",
        datePosted: "Date Posted",
        dueDate: "Due Date",
        jobType: "Job Type",
        applicants: "Applicants",
        needs: "Needs"
    };

    const jobs = [
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
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

const handleButtonClick = () => {
    router.push("/dashboard/company/postjob");
}


    return (
        <>
            <CompanyHeader image="/img/company_logo.png" name="Nomad" button={{ text: "Post a Job", IsWhite: false, width: "w-xs", icon: <FaPlus />, onClick: handleButtonClick }} />
            <div className={styles.borderBottomLight}></div>
            <DashboardWelcome greeting="Job Listing" message="Here is your jobs listing status from July 19 - July 25." date="Jul 19 - Jul 25" />
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
    )
}