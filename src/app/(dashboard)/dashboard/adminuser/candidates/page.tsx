"use client";
import { useState, useEffect } from "react";
import { styles } from "@/app/styles";
import CandidatesListTable from "@/app/components/CandidateListTable";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";
import { ICandidate } from "@/app/Types/slices";
import DashboardNavbar from "@/app/components/DashboardNavbar";

export default function CandidatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [searchTerm, setSearchTerm] = useState("");

  const columns = {
    name: "Name",
    email: "Email",
    address: "Address",
    createdAt: "Date Joined",
    application: "Number of Applications",
  };

  useEffect(() => {
    let queryParams = "";
    if (startDate && endDate) {
      queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    if (searchTerm && searchTerm.length > 2) {
      queryParams += queryParams
        ? `&search=${encodeURIComponent(searchTerm)}`
        : `?search=${encodeURIComponent(searchTerm)}`;
    }
    const fetchCandidates = async () => {
      try {
        const response = await fetch(`/api/admin/candidates${queryParams}`);
        if (!response.ok) throw new Error("Failed to fetch candidates");
        const candidates = await response.json();

        setCandidates(candidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        throw error;
      }
    };
    fetchCandidates();
  }, [startDate, endDate, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = candidates.slice(indexOfFirstItem, indexOfLastItem);

  const getDate = (date: Date | undefined | null) => {
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = date;

    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };

  return (
    <>
      <DashboardNavbar title="Candidates" />
      <div className={styles.borderBottomLight}></div>

      <div className="flex xs:flex-row flex-col gap-y-5 justify-between xs:items-center border border-gray-200 px-5 py-8 w-full">
        <div>
          <p className={`${styles.JobDescriptionText}`}>
          See all the candidates below{" "}
            {startDate && endDate && (
              <>
                from {getDate(startDate)} - {getDate(endDate)}
              </>
            )}
          </p>
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      <CandidatesListTable
        candidates={currentCandidates}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={candidates.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={true}
      />
    </>
  );
}
