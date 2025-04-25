"use client";
import { useState, useEffect } from "react";
import { styles } from "@/app/styles";
import ApplicationsListTable from "@/app/components/ApplicationsListTable";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useRouter } from "next/navigation";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";
import { IApplication } from "@/app/Types/slices";

interface Compatibility {
  score: number;
  feedback: string;
  recommendation: string;
}

interface Application {
  id: string;
  candidateId: string;
  compatibility?: Compatibility;
  jobId: string;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewProfile = (id: string) => {
    router.push(`/dashboard/company/applicantdetails/${id}`);
  };

  const columns = {
    name: "Applicant",
    position: "Position",
    appliedAt: "Applied Date",
    status: "Status",
    compatibility: "Match Score",
    actions: "Actions",
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
    const fetchCompanyApplications = async () => {
      try {
        let queryParams = "";
        if (startDate && endDate) {
          queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }
        if (searchTerm && searchTerm.length > 2) {
          queryParams += queryParams
            ? `&search=${encodeURIComponent(searchTerm)}`
            : `?search=${encodeURIComponent(searchTerm)}`;
        }
    
        const response = await fetch(`/api/company/applications${queryParams}`);
        if (!response.ok) throw new Error("Failed to fetch company applications");
        const applications = await response.json();
        console.log('Fetched Applications:', applications);
    
        if (applications.length > 0) {
          const candidatesWithoutScores = applications
            .filter((app: Application) => !app.compatibility)
            .map((app: Application) => app.candidateId);
    
          if (candidatesWithoutScores.length > 0) {
            await fetch('/api/company/analyze-candidates', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jobId: applications[0].jobId,
                candidateIds: candidatesWithoutScores
              })
            });
            
            const finalResponse = await fetch(`/api/company/applications${queryParams}`);
            const updatedApplications = await finalResponse.json();
            setApplications(updatedApplications);
            return;
          }
        }
    
        setApplications(applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchCompanyApplications();
  }, [startDate, endDate, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  console.log('Pagination Debug:', {
    total: applications.length,
    currentPage,
    itemsPerPage,
    indexOfFirstItem,
    indexOfLastItem,
    currentApplications
  });

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
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight}></div>

      <div className="flex xs:flex-row flex-col gap-y-5 justify-between xs:items-center border border-gray-200 px-5 py-8 w-full">
        <div>
          <p className={`${styles.JobDescriptionText}`}>
            Track and manage all candidate applications below{" "}
            {startDate && endDate && (
              <>
                from {getDate(startDate)} - {getDate(endDate)}
              </>
            )}
          </p>
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      <ApplicationsListTable
        applications={currentApplications}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={applications.length}
        onViewProfile={handleViewProfile}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={true}
      />
    </>
  );
}
