"use client";
import { FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { CompanyListTableProps } from "../Types";

const CompanyListTable = ({
  companies,
  columns,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalItems,
  searchTerm,
  onSearchChange,
  isLoading
}: CompanyListTableProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="w-full mt-4 md:mt-8">
      <div className="flex justify-end px-4 py-3 mb-4">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 w-full max-w-xs">
          <BsSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 bg-gray-100 text-gray-600 text-sm font-semibold">
        {Object.values(columns).map((column, index) => (
          <div key={index} className="text-center">
            {column}
          </div>
        ))}
      </div>

      <div className="space-y-4 md:space-y-0">
        {companies.map((company) => {
          return (
            <div
              key={company.id}
              className="border border-gray-200 p-3 sm:p-4 rounded-lg md:rounded-none md:border-0 md:border-b md:grid md:grid-cols-5 md:gap-4"
            >
              <div className="flex items-center gap-2 sm:gap-3 justify-center mb-3 md:mb-0">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-xs sm:text-sm" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-gray-800">
                    {company?.name || "N/A"}
                  </div>
                  <div className="text-xs text-gray-500">{company?.email}</div>
                </div>
              </div>

              <div className="flex items-center justify-center text-xs sm:text-sm py-2 md:py-0">
                {company?.city && company?.province
                  ? `${company.city}, ${company.province}`
                  : company?.city || company?.province || "N/A"}
              </div>

              <div className="flex items-center justify-center text-xs sm:text-sm py-2 md:py-0">
                {company?.industry || "N/A"}
              </div>

              <div className="flex items-center justify-center text-xs sm:text-sm py-2 md:py-0">
                {company?.createdAt
                  ? new Date(company.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>

              <div className="flex items-center justify-center text-xs sm:text-sm py-2 md:py-0">
                {company?.totalJobsPosted ?? 0}
              </div>
            </div>
          );
        })}
      </div>

      {companies.length === 0 && (
        <div className="text-center text-gray-500 text-sm py-6">
           {isLoading ? (
        "Loading companies..."
      ) : (
        "No companies found matching your search"
      )}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 border-t mt-6 rounded-b-lg">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">View</span>
          <select
            className="rounded px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <span className="text-gray-600">companies per page</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyListTable;
