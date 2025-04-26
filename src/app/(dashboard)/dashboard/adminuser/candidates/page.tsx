"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { fetchUsers } from "@/app/context/slices/usersSlices";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import Loader from "@/app/components/Loader";
import ApplicationsList from "@/app/components/ApplicationsList";
import { Application } from "@/app/Types";

export default function CandidatesPage() {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchUsers("CANDIDATE"));
  }, [dispatch]);

  if (!isClient || loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <DashboardNavbar
          title="Candidates"
          button={{ text: "Back to home page", IsWhite: true }}
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">All Candidates</h1>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <>
        <DashboardNavbar
          title="Candidates"
          button={{ text: "Back to home page", IsWhite: true }}
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">All Candidates</h1>
          <p>No candidates found</p>
        </div>
      </>
    );
  }

  const columns = {
    name: "Name",
    position: "Application",
    appliedDate: "Date Joined",
    status: "Status",
    actions: "Profile"
  };

  const data = users.map((candidate) => ({
    id: candidate.id || "",
    name: `${candidate.firstName} ${candidate.lastName}`,
    email: candidate.email || "",
    position: candidate.application?.[0]?.job?.title || "No applications",
    appliedDate: candidate.application?.[0]?.appliedAt || candidate.createdAt || new Date().toISOString(),
    status: "PENDING" as const
  }));

  const handleViewProfile = (id: string) => {
    console.log("View profile:", id);
  };

  return (
    <>
      <DashboardNavbar
        title="Candidates"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Candidates</h1>
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
