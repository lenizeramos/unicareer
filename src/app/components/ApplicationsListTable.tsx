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
      PENDING: "bg-yellow-50 text-yellow-400",
      INTERVIEWED: "bg-indigo-50 text-indigo-600",
      REJECTED: "bg-rose-50 text-rose-600",
    };
    return colors[status];
  };

  return (
    <div className="mt-2 md:mt-8 border-light">
      <div className="px-3 flex justify-end mb-4">
        <div className="flex items-center border rounded-xl p-1 border-gray-400 w-fit h-fit">
          <BsSearch color="#99a1af" />
          <input
            type="text"
            placeholder="Search"
            className="font-shafarik px-3 w-[5rem] sm:text-md text-sm border-none outline-none"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b bg-gray-50 font-semibold text-sm">
          {Object.values(columns).map((column, index) => (
            <div key={index} className="text-not-focus-color text-center">
              {column}
            </div>
          ))}
        </div>

        {applications.map((application) => (
          <div
            key={application.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border-b border-gray-100"
          >
            {columns.name && (
              <div className="md:flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <FaUser className="text-gray-500" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-[600]">
                    {application.candidate?.firstName}{" "}
                    {application.candidate?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {application.candidate?.user?.email}
                  </div>
                </div>
              </div>
            )}

            {columns.position && (
              <div className="md:flex items-center justify-center">
                <div className="text-lg font-[500]">
                  {application.job?.title}
                </div>
              </div>
            )}

            {columns.appliedAt && (
              <div className="md:flex items-center justify-center">
                <div className="text-lg font-[500]">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </div>
              </div>
            )}

            {columns.status && (
              <div className="flex items-center justify-start md:justify-center">
                <Badge
                  status={application.status}
                  color={getStatusColor(application.status)}
                />
              </div>
            )}
            {columns.actions && (
              <div className="flex items-center justify-center">
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
        <div className="text-center py-4 text-xs md:text-base text-gray-500">
          No applications found matching your search
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t">
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
            <option value={50} className="hidden md:block">
              50
            </option>
          </select>
          <span className="text-gray-500">per page</span>
        </div>

        <div className="flex justify-center items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>
          <span className="text-xs">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsListTable;
