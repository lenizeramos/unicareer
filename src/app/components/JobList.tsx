"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { JobListProps, IJob } from "../Types";
import Badge from "./Badge";
import ButtonComp from "./ButtonComp";

export default function JobList({
  jobs,
  columns,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalItems,
  onViewJobDetails,
}: JobListProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderValue = (val: unknown): React.ReactNode => {
    if (val === null || val === undefined) return "-";
    if (typeof val === "string" || typeof val === "number")
      return val;
    if (Array.isArray(val)) return val.join(", ");
    if (val instanceof Date) return val.toLocaleDateString();
    return "-";
  };

  return (
    <div className="mt-8 border-light">
      {/* Desktop Headers - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-9 gap-4 px-6 py-3 bg-gray-100 text-gray-600 text-sm font-semibold">
        {Object.values(columns).map((column, index) => (
          <div key={index} className="text-center">
            {column}
          </div>
        ))}
      </div>

      {/* Card Layout */}
      <div className="space-y-4 md:space-y-0">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-sm border border-gray-200 p-6 rounded-lg md:rounded-none md:border-0 md:border-b md:grid md:grid-cols-9 md:gap-4"
          >
            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {/* Header Section */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  {String(job.title || '-')}
                </h3>
                <div className="flex-shrink-0">
                  <Badge status={String(job.status)} color={String(job.status).toLowerCase()} />
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(columns).map((key) => {
                  if (key === 'title' || key === 'status' || key === 'actionButton') return null;
                  
                  return (
                    <div key={key} className="space-y-1">
                      <span className="text-sm text-gray-500">{columns[key]}</span>
                      <div className="font-medium">
                        {key === "type" ? (
                          <Badge status={String(job[key as keyof IJob])} color={String(job[key as keyof IJob]).toLowerCase()} />
                        ) : key === "closingDate" || key === "createdAt" || key === "updatedAt" ? (
                          new Date(String(renderValue(job[key as keyof IJob]))).toLocaleDateString()
                        ) : (
                          renderValue(job[key as keyof IJob])
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <ButtonComp
                  text="View Job"
                  IsWhite={true}
                  onClick={() => onViewJobDetails && onViewJobDetails(job.id ?? "")}
                />
              </div>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:contents">
              {Object.keys(columns).map((key, index) => (
                <div key={index} className="py-4 text-center">
                  {key === "status" || key === "type" ? (
                    <div className="flex items-center justify-center">
                      <span className="inline-block">
                        <Badge status={String(job[key as keyof IJob])} color={String(job[key as keyof IJob]).toLowerCase()} />
                      </span>
                    </div>
                  ) : key === "title" ? (
                    <div className="text-lg font-semibold text-gray-600">
                      {typeof job[key as keyof IJob] === "string" ? String(job[key as keyof IJob]) : "-"}
                    </div>
                  ) : key === "closingDate" || key === "createdAt" || key === "updatedAt" ? (
                    <div className="text-lg font-[500]">
                      {new Date(String(renderValue(job[key as keyof IJob]))).toLocaleDateString()}
                    </div>
                  ) : key === "actionButton" ? (
                    <div className="flex justify-center">
                      <ButtonComp
                        text="View Job"
                        IsWhite={true}
                        onClick={() => onViewJobDetails && onViewJobDetails(job.id ?? "")}
                      />
                    </div>
                  ) : (
                    renderValue(job[key as keyof IJob])
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 border-t mt-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-gray-600">View</span>
          <select
            className="rounded px-2 py-1 border-light"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-600">jobs per page</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 sm:p-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded disabled:opacity-50"
          >
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
