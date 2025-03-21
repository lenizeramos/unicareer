import { FaArrowLeft, FaArrowRight, FaFilter } from "react-icons/fa";
import { IJob, JobListProps } from "../Types";
import Badge from "./Badge";

export default function JobList({
  jobs,
  columns,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalItems,
}: JobListProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-8 border-light">
      <div className="flex justify-between items-center border-bottom-light p-8">
        <h2 className="text-xl text-title-color font-bold">Job List</h2>
        <button className="flex items-center gap-2 text-sm text-title-color border-light p-4">
          <FaFilter />
          <p>Filters</p>
        </button>
      </div>
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
            {jobs.map((job, index) => (
              <tr key={index}>
                {Object.keys(columns).map((key, index) => (
                  <td
                    key={index}
                    className="p-8 border-bottom-light text-center text-title-color font-medium"
                  >
                    {key === "status" || key === "type" ? (
                      <Badge
                        status={job[key as keyof IJob]}
                        color={job[key as keyof IJob].toLowerCase()}
                      />
                    ) : key === "title" ? (
                      <div className="text-lg font-[600]">
                        {job[key as keyof IJob]}
                      </div>
                    ) : key === "closingDate" ||
                      key === "createdAt" ||
                      key === "updatedAt" ? (
                      <div className="text-lg font-[500]">
                        {new Date(job[key as keyof IJob]).toLocaleDateString()}
                      </div>
                    ) : key === "applicants" ? (
                      <div className="text-lg font-[500]">
                        {job[key as keyof IJob]}
                      </div>
                    ) : key === "needs" ? (
                      <div className="flex items-center justify-center gap-1">
                        <p className="text-title-color font-medium text-lg">
                          {job[key as keyof IJob].split("/")[0]}{" "}
                        </p>
                        <p className="text-not-focus-color font-medium text-lg">
                          / {job[key as keyof IJob].split("/")[1]}
                        </p>
                      </div>
                    ) : (
                      job[key as keyof IJob]
                    )}
                  </td>
                ))}
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
            Applicants per page
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
                currentPage === page ? "bg-primary text-white bg-primary" : ""
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
