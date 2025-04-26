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
    let queryParams = "";
    if (startDate && endDate) {
      queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    if (searchTerm && searchTerm.length > 2) {
      queryParams += queryParams
        ? `&search=${encodeURIComponent(searchTerm)}`
        : `?search=${encodeURIComponent(searchTerm)}`;
    }
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`/api/admin/companies${queryParams}`);
        if (!response.ok) throw new Error("Failed to fetch companies");
        const companies = await response.json();

        setCompanies(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
      }
    };
    fetchCompanies();
  }, [startDate, endDate, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirstItem, indexOfLastItem);

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
        companies={currentCompanies}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={companies.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={true}
      />
    </>
  );
}
