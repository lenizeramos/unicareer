'use client';
import { useState } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import ApplicantsList from "@/app/components/ApplicantsList";
import { FaPlus } from "react-icons/fa";

export default function ApplicationsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const columns = {
        name: "Applicant",
        position: "Position",
        appliedDate: "Applied Date",
        status: "Status",
        actions: "Actions"
    };

    const applicants = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 890',
            position: 'Senior Frontend Developer',
            appliedDate: '2024-03-15',
            status: 'pending' as const,
            linkedIn: 'https://linkedin.com/in/johndoe'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            position: 'Backend Engineer',
            appliedDate: '2024-03-14',
            status: 'interviewed' as const,
            linkedIn: 'https://linkedin.com/in/janesmith'
        },
        {
            id: '3',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 890',
            position: 'Senior Frontend Developer',
            appliedDate: '2024-03-15',
            status: 'rejected' as const,
            linkedIn: 'https://linkedin.com/in/johndoe'
        }
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApplicants = applicants.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <CompanyHeader image="/img/company_logo.png" name="Nomad" button={{ text: "Post a Job", IsWhite: false, width: "w-xs", icon: <FaPlus /> }} />
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
