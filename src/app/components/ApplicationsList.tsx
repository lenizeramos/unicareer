"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";
import ButtonComp from "./ButtonComp";
import Badge from "./Badge";
import { Application, ApplicationsListProps } from "../Types";
/* import { useRouter } from "next/navigation"; */

const MobileApplicantCard = ({
  application,
  getStatusColor,
  columns,
  onViewProfile,
}: {
  application: Application;
  getStatusColor: (status: Application["status"]) => string;
  columns: { [key: string]: string };
  onViewProfile?: (id: string) => void;
}) => (
  <div className="bg-white p-3 border-b">
    {columns.name && (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <FaUser className="text-gray-500 text-xs" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{application.name}</h3>
          <p className="text-xs text-gray-500">{application.position}</p>
        </div>
      </div>
    )}
    <div className="mt-2 space-y-1">
      {columns.email && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <FaEnvelope className="text-[10px]" />
          <span>{application.email}</span>
        </div>
      )}
      {columns.appliedDate && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>
            Applied: {new Date(application.appliedDate).toLocaleDateString()}
          </span>
        </div>
      )}
      {columns.status && (
        <div className="flex justify-between items-center mt-2">
          <Badge
            status={application.status}
            color={getStatusColor(application.status)}
          />
          <div className="flex items-center gap-2">
            <ButtonComp
              text={<span className="text-xs">View Profile</span>}
              IsWhite={true}
              onClick={() => onViewProfile && onViewProfile(application.id)}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

const ApplicationsList = ({
  applications,
  columns,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalItems,
  onViewProfile
}: ApplicationsListProps) => {
  /* const router = useRouter(); */
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Application["status"] | "all">(
    "all"
  );
  const [positionFilter, setPositionFilter] = useState("all");
  const [emailFilter, setEmailFilter] = useState("");

  const positions = [...new Set(applications.map((a) => a.position))];

  const filteredApplications = applications.filter((application) => {
    const matchesName =
      searchTerm === "" ||
      application.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEmail =
      emailFilter === "" ||
      application.email?.toLowerCase().includes(emailFilter.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    const matchesPosition =
      positionFilter === "all" || application.position === positionFilter;

    return matchesName && matchesEmail && matchesStatus && matchesPosition;
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusColor = (status: Application["status"]) => {
    const colors = {
      PENDING: "bg-yellow-50 text-yellow-400",
      INTERVIEWED: "bg-indigo-50 text-indigo-600",
      REJECTED: "bg-rose-50 text-rose-600",
    };
    return colors[status];
  };

  return (
    <div className="mt-2 md:mt-8 border-light">
      <div className="p-3 md:p-8 space-y-3 border-b">
        <h2 className="text-base md:text-xl text-title-color font-bold">
          Applications List
        </h2>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 py-1.5 px-2 text-xs border border-primary rounded w-full focus:outline-none"
            />
          </div>
          <div className="relative w-full md:w-32">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-1 text-xs border border-primary rounded py-1.5 px-2 w-full"
            >
              <FaFilter size={10} />
              <p>Filters</p>
            </button>

            {showFilters && (
              <>
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => setShowFilters(false)}
                />

                <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-primary rounded-lg shadow-lg p-4 z-10">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Filter by Name
                      </label>
                      <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-1.5 text-xs border border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Filter by Email
                      </label>
                      <input
                        type="email"
                        placeholder="Search by email..."
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        className="w-full p-1.5 text-xs border border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) =>
                          setStatusFilter(
                            e.target.value as Application["status"] | "all"
                          )
                        }
                        className="w-full p-1.5 text-xs border border-primary rounded"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="rejected">Rejected</option>
                        <option value="accepted">Accepted</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <select
                        value={positionFilter}
                        onChange={(e) => setPositionFilter(e.target.value)}
                        className="w-full p-1.5 text-xs border border-primary rounded"
                      >
                        <option value="all">All Positions</option>
                        {positions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end pt-2">
                      <ButtonComp
                        text="Clear Filters"
                        IsWhite={true}
                        onClick={() => {
                          setSearchTerm("");
                          setEmailFilter("");
                          setStatusFilter("all");
                          setPositionFilter("all");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {filteredApplications.map((application) => (
            <MobileApplicantCard
              key={application.id}
              application={application}
              getStatusColor={getStatusColor}
              columns={columns}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-scroll max-w-[360px] md:max-w-full md:w-full text-center">
          <table className="w-full pe-8 ps-8">
            <thead className="border-bottom-light p-8">
              <tr>
                {Object.values(columns).map((column, index) => (
                  <th key={index} className="text-not-focus-color p-8">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  {columns.name && (
                    <td className="p-4 border-bottom-light">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUser className="text-gray-500" />
                        </div>
                        <div className="ml-4 text-left">
                          <div className="text-lg font-[600]">
                            {application.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.email}
                          </div>
                        </div>
                      </div>
                    </td>
                  )}

                  {columns.position && (
                    <td className="p-4 border-bottom-light">
                      <div className="text-lg font-[500]">
                        {application.position}
                      </div>
                    </td>
                  )}

                  {columns.appliedDate && (
                    <td className="p-4 border-bottom-light">
                      <div className="text-lg font-[500]">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </td>
                  )}

                  {columns.status && (
                    <td className="p-4 border-bottom-light">
                      <Badge
                        status={application.status}
                        color={getStatusColor(application.status)}
                      />
                    </td>
                  )}

                  {columns.actions && (
                    <td className="p-4 border-bottom-light">
                      <div className="flex justify-center gap-2">
                        <ButtonComp
                          text="View Profile"
                          IsWhite={true}
                          onClick={() => onViewProfile && onViewProfile(application.id)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-4 text-xs md:text-base text-gray-500">
          No applications found matching your search
        </div>
      )}

      <div className="flex flex-col gap-3 p-3 border-t md:hidden">
        <div className="flex items-center justify-center gap-1 text-xs">
          <span className="text-gray-500">View</span>
          <select
            className="border rounded py-1 px-1.5"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span className="text-gray-500">per page</span>
        </div>

        <div className="flex justify-center items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded disabled:opacity-50"
          >
            <FaArrowLeft size={12} />
          </button>
          <span className="text-xs">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded disabled:opacity-50"
          >
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center p-8 border-t">
        <div className="flex items-center gap-2">
          <span className="text-lg text-not-focus-color">View</span>
          <select
            className="border-light rounded p-2"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-lg text-not-focus-color">
            Applications per page
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded ${
                currentPage === page ? "bg-primary text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

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

export default ApplicationsList;
