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

  return (
    <div className="mt-8 border-light">
      <div className="overflow-x-scroll max-w-[360px] md:max-w-full md:w-full text-center">
        <table className="w-full pe-8 ps-8">
          <thead className="p-8 bg-gray-100 text-gray-600 text-sm font-semibold border-t border-b">
            <tr>
              {Object.values(columns).map((column, index) => (
                <th key={index} className="text-not-focus-color p-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                {Object.keys(columns).map((key, index) => {
                  const value = job[key as keyof IJob];
                  return (
                    <td
                      key={index}
                      className="p-8 border-b border-gray-200 text-center text-title-color font-medium"
                    >
                      {key === "status" || key === "type" ? (
                        typeof value === "string" ? (
                          <Badge status={value} color={value.toLowerCase()} />
                        ) : (
                          "-"
                        )
                      ) : key === "title" ? (
                        <div className="text-lg font-semibold text-gray-600">
                          {typeof value === "string" ? value : "-"}
                        </div>
                      ) : key === "closingDate" ||
                        key === "createdAt" ||
                        key === "updatedAt" ? (
                        <div className="text-lg font-[500]">
                          {typeof value === "string" ||
                          typeof value === "number"
                            ? new Date(value).toLocaleDateString()
                            : "-"}
                        </div>
                      ) : key === "actionButton" ? (
                        <ButtonComp
                          text="View Job"
                          IsWhite={true}
                          onClick={() =>
                            onViewJobDetails && onViewJobDetails(job.id ?? "")
                          }
                        />
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-8 border-top-light">
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
            jobs per page
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
                currentPage === page ? "bg-primary text-white " : ""
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
}
