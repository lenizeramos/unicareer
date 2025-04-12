import ApplicantsList from "@/app/components/ApplicantsList";
import { useState } from "react";
import { Applicant } from "../Types";

export default function UserApplications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const columns = {
    position: "Position",
    appliedDate: "Applied Date",
    status: "Status",
    actions: "Actions",
  };

  const currentUserId = "currentUserId";

  const allApplications: Applicant[] = [
    {
      id: "1",
      userId: currentUserId,
      position: "Senior Frontend Developer",
      appliedDate: "2024-03-15",
      status: "PENDING",
    },
    {
      id: "2",
      userId: currentUserId,
      position: "Backend Engineer",
      appliedDate: "2024-03-14",
      status: "INTERVIEWED",
    },
  ];

  const userApplications = allApplications.filter(
    (app) => app.userId === currentUserId
  );

  return (
    <>
      <ApplicantsList
        applicants={userApplications}
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
