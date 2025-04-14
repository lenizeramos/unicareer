import ApplicationsList from "@/app/components/ApplicationsList";
import { useState } from "react";
import { Application } from "../Types";

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

  const allApplications: Application[] = [
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
      <ApplicationsList
        applications={userApplications}
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
