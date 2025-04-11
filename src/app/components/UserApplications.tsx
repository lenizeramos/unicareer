import ApplicantsList from "@/app/components/ApplicantsList";
import { useState } from "react";

interface Applicant {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    appliedDate: string;
    status: 'pending' | 'interviewed' | 'rejected' | 'accepted';
}

export default function UserApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const columns = {
        position: "Position",
        appliedDate: "Applied Date",
        status: "Status",
        actions: "Actions"
    };

    const currentUserId = 'currentUserId';

    const allApplications = [
        {
            id: '1',
            userId: currentUserId,
            position: 'Senior Frontend Developer',
            appliedDate: '2024-03-15',
            status: 'pending' as const
        },
        {
            id: '2',
            userId: currentUserId,
            position: 'Backend Engineer',
            appliedDate: '2024-03-14',
            status: 'interviewed' as const
        }
    ];

    const userApplications = allApplications.filter(app => app.userId === currentUserId);

    return (
        <>
            <ApplicantsList 
                applicants={userApplications as Applicant[]}
                columns={columns}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalItems={userApplications.length}
            />
        </>
    );
}
