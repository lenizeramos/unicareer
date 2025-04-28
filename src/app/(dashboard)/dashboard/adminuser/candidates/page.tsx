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
  const [totalCandidates, setTotalCandidates] = useState<number>(0);
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
    const fetchCandidates = async () => {
      try {
        const params = new URLSearchParams({
          skip: ((currentPage - 1) * itemsPerPage).toString(),
          take: itemsPerPage.toString(),
        });

        if (startDate && endDate) {
          params.append("startDate", startDate.toISOString());
          params.append("endDate", endDate.toISOString());
        }

        if (searchTerm && searchTerm.length > 2) {
          params.append("search", searchTerm);
        }

        const response = await fetch(`/api/admin/candidates?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch candidates");
        const {candidates, totalCandidates} = await response.json();

        setCandidates(candidates);
        setTotalCandidates(totalCandidates)
      } catch (error) {
        console.error("Error fetching candidates:", error);
        throw error;
      }
    };
    fetchCandidates();
  }, [startDate, endDate, searchTerm, currentPage, itemsPerPage ]);

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
        candidates={candidates}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setCurrentPage(1);
          setItemsPerPage(value);
        }}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={totalCandidates}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={true}
      />
    </>
  );
}
