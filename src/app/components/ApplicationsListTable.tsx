"use client";

import { FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import ButtonComp from "./ButtonComp";
import Badge from "./Badge";
import { ApplicationsListTableProps } from "../Types";
import { IApplication } from "../Types/slices";

const ApplicationsListTable = ({
  applications,
  columns,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalItems,
  onViewProfile,
  searchTerm,
  onSearchChange,
}: ApplicationsListTableProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusColor = (status: IApplication["status"]) => {
    const colors = {
      PENDING: "border-PENDING text-PENDING",
      INTERVIEWED: "border-interviewed text-interviewed", 
      REJECTED: "border-rejected text-rejected",
      HIRED: "border-hired text-hiredColor",
      CANCELLED_JOB: "border-cancelledJob text-cancelledJobColor"
    };
    return colors[status];
};

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

      <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 bg-gray-100 text-gray-600 text-sm font-semibold border-t border-b">
        {Object.values(columns).map((column, index) => (
          <div key={index} className="text-center">
            {column}
          </div>
        ))}
      </div>

      <div className="space-y-4 md:space-y-0">
        {applications.map((application) => (
          <div
            key={application.id}
            className="border border-gray-200 p-4 rounded-lg md:rounded-none md:border-0 md:border-b md:grid md:grid-cols-5 md:gap-4"
          >
            <div className="md:hidden flex justify-between items-start">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-sm" />
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-800">
                    {application.candidate?.firstName}{" "}
                    {application.candidate?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {application.candidate?.user?.email}
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    {application.job?.title}
                  </div>
                </div>
              </div>

              <div className="ml-2 shrink-0">
                <Badge
                  status={application.status}
                  color={getStatusColor(application.status)}
                />
              </div>
            </div>

            <div className="md:hidden mt-4">
              <ButtonComp
                text="View Profile"
                IsWhite={true}
                width={"w-full"}
                onClick={() => onViewProfile && onViewProfile(application.id)}
              />
            </div>

            {columns.name && (
              <div className="hidden md:flex items-center gap-3 justify-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-sm" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {application.candidate?.firstName}{" "}
                    {application.candidate?.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {application.candidate?.user?.email}
                  </div>
                </div>
              </div>
            )}

            {columns.position && (
              <div className="hidden md:flex items-center justify-center text-sm text-gray-700 font-medium text-center">
                {application.job?.title}
              </div>
            )}

            {columns.appliedAt && (
              <div className="hidden md:flex items-center justify-center text-sm text-gray-700">
                {new Date(application.appliedAt).toLocaleDateString()}
              </div>
            )}

            {columns.status && (
              <div className="hidden md:flex items-center justify-center">
                <Badge
                  status={application.status}
                  color={getStatusColor(application.status)}
                />
              </div>
            )}

            {columns.actions && (
              <div className="hidden md:flex justify-center">
                <ButtonComp
                  text="View Profile"
                  IsWhite={true}
                  onClick={() => onViewProfile && onViewProfile(application.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center text-gray-500 text-sm py-6">
          No applications found matching your search
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
          <span className="text-gray-600">applicantions per page</span>
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

export default ApplicationsListTable;
