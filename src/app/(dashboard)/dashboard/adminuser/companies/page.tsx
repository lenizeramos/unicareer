"use client";
import { useState, useEffect } from "react";
import { styles } from "@/app/styles";
import CompanyListTable from "@/app/components/CompanyListTable";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";
import { ICompany } from "@/app/Types/slices";
import DashboardNavbar from "@/app/components/DashboardNavbar";

export default function CompaniesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [searchTerm, setSearchTerm] = useState("");

  const columns = {
    name: "Name",
    address: "Address",
    industry: "Industry",
    createdAt: "Date Joined",
    jobs: "Number of Jobs Posted",
  };

  useEffect(() => {
        const fetchCompanies = async () => {
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
        const response = await fetch(`/api/admin/companies?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch companies");
        const {companies, totalCompanies} = await response.json();

        setCompanies(companies);
        setTotalCompanies(totalCompanies)
      } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
      }
    };
    fetchCompanies();
  }, [startDate, endDate, searchTerm, currentPage, itemsPerPage]);

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
      <DashboardNavbar title="Companies" />
      <div className={styles.borderBottomLight}></div>

      <div className="flex xs:flex-row flex-col gap-y-5 justify-between xs:items-center border border-gray-200 px-5 py-8 w-full">
        <div>
          <p className={`${styles.JobDescriptionText}`}>
            See all the companies below{" "}
            {startDate && endDate && (
              <>
                from {getDate(startDate)} - {getDate(endDate)}
              </>
            )}
          </p>
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      <CompanyListTable
        companies={companies}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setCurrentPage(1);
          setItemsPerPage(value);
        }}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={totalCompanies}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={true}
      />
    </>
  );
}
