"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { fetchUsers } from "@/app/context/slices/usersSlices";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import Loader from "@/app/components/Loader";
import ApplicationsList from "@/app/components/ApplicationsList";
import { Application } from "@/app/Types";

export default function CompaniesPage() {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchUsers("COMPANY"));
  }, [dispatch]);

  if (!isClient || loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <DashboardNavbar
          title="Companies"
          button={{ text: "Back to home page", IsWhite: true }}
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">All Companies</h1>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <>
        <DashboardNavbar
          title="Companies"
          button={{ text: "Back to home page", IsWhite: true }}
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">All Companies</h1>
          <p>No companies found</p>
        </div>
      </>
    );
  }

  const columns = {
    name: "Company",
    position: "Job Title",
    appliedDate: "Posted Date",
    status: "Status",
    actions: "View"
  };

  const data: Application[] = users.flatMap(company => 
    (company.jobs || []).map(job => ({
      id: job.id || "",
      name: company.name || "",
      email: company.email || "",
      position: job.title || "No title specified",
      appliedDate: job.createdAt || "Not specified",
      status: job.status === "OPEN" ? "PENDING" : "REJECTED"
    }))
  );

  const handleViewProfile = (id: string) => {
    console.log("View company profile:", id);
  };

  return (
    <>
      <DashboardNavbar
        title="Companies"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Companies</h1>
        <ApplicationsList
          applications={data}
          columns={columns}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={data.length}
          onViewProfile={handleViewProfile}
        />
      </div>
    </>
  );
}
