"use client";

import {
  FaUser,
  FaArrowLeft,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import ButtonComp from "./ButtonComp";
import Badge from "./Badge";
import { ApplicationsListTableProps } from "../Types";
import { IApplication } from "../Types/slices";
import { useState } from "react";
import SearchNotFound from "./SearchNotFound";
import Loader from "./Loader";

interface Compatibility {
  score: number;
  feedback: string;
  recommendation: string;
}

interface CompatibilityModalProps {
  compatibility: Compatibility;
  isOpen: boolean;
  onClose: () => void;
}

const CompatibilityModal = ({
  compatibility,
  isOpen,
  onClose,
}: CompatibilityModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 shadow-xl">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 font-monomakh">
            Compatibility Analysis
          </h3>

          <div className="space-y-6 mb-8 font-shafarik">
            <div>
              <p className="text-sm text-gray-500 mb-1">Compatibility Score</p>
              <p className="text-2xl font-bold text-gray-800">
                {compatibility.score.toFixed(1)}%
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Feedback</p>
              <p className="text-gray-700">{compatibility.feedback}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Recommendation</p>
              <p className="text-gray-700 font-medium">
                {compatibility.recommendation.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 font-shafarik"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

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
  isLoading,
}: ApplicationsListTableProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusColor = (status: IApplication["status"]) => {
    const colors = {
      PENDING: "border-PENDING text-PENDING",
      INTERVIEWED: "border-interviewed text-interviewed",
      REJECTED: "border-rejected text-rejected",
      HIRED: "border-hired text-hiredColor",
      CANCELLED_JOB: "border-cancelledJob text-cancelledJobColor",
    };
    return colors[status];
  };

  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    compatibility: Compatibility | null;
  }>({
    isOpen: false,
    compatibility: null,
  });

  const renderCompatibilityScore = (compatibility: Compatibility | null) => {
    if (!compatibility) return "Pending Analysis";

    const scoreColor =
      compatibility.score >= 80
        ? "text-green-600"
        : compatibility.score >= 60
        ? "text-yellow-600"
        : "text-red-600";

    const recommendationColor =
      compatibility.recommendation === "HIGHLY_RECOMMENDED"
        ? "text-green-600"
        : compatibility.recommendation === "RECOMMENDED"
        ? "text-yellow-600"
        : compatibility.recommendation === "NOT_RECOMMENDED"
        ? "text-red-600"
        : "text-gray-600";

    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${scoreColor}`}>
              {compatibility.score.toFixed(1)}%
            </span>
            <FaInfoCircle
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => setModalData({ isOpen: true, compatibility })}
            />
          </div>
          <span className={`text-sm ${recommendationColor}`}>
            {compatibility.recommendation.replace(/_/g, " ")}
          </span>
        </div>
        <CompatibilityModal
          compatibility={modalData.compatibility!}
          isOpen={modalData.isOpen}
          onClose={() => setModalData({ isOpen: false, compatibility: null })}
        />
      </>
    );
  };

  return (
    <div className="w-full mt-4 md:mt-8">
      <div className="flex justify-end px-2 sm:px-4 py-3 mb-4">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 w-full max-w-xs">
          <BsSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm bg-transparent focus:outline-none font-shafarik"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:grid grid-cols-6 gap-2 sm:gap-4 px-3 sm:px-6 py-3 bg-gray-100 text-gray-600 text-sm font-semibold">
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
            className="border border-gray-200 p-3 sm:p-4 rounded-lg md:rounded-none md:border-0 md:border-b md:grid md:grid-cols-6 md:gap-4 items-center"
          >
            <div className="flex items-center gap-2 sm:gap-3 justify-center mb-3 md:mb-0">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="text-gray-500 text-xs sm:text-sm" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-gray-800">
                  {application.candidate?.firstName}{" "}
                  {application.candidate?.lastName}
                </div>
              </div>
            </div>

            <div className="text-center text-xs sm:text-sm py-2 md:py-0">
              {application.job?.title}
            </div>
            <div className="text-center text-xs sm:text-sm py-2 md:py-0">
              {new Date(application.appliedAt).toLocaleDateString()}
            </div>
            <div className="text-center py-2 md:py-0">
              <Badge
                status={application.status}
                color={getStatusColor(application.status)}
              />
            </div>
            <div className="text-center py-2 md:py-0">
              {renderCompatibilityScore(application.compatibility || null)}
            </div>
            <div className="flex justify-center items-center py-2 md:py-0">
              <ButtonComp
                text="View Profile"
                IsWhite={true}
                onClick={() => onViewProfile && onViewProfile(application.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 ? (
        <SearchNotFound text="No applications found." optionSubText={false} />
      ) : (
        <div className="text-center text-gray-500 text-sm py-6">
          {isLoading ? (
            <Loader />
          ) : (
            <SearchNotFound text="No applications found matching your search" />
          )}
        </div>
      )}

      <div className="md:flex flex-col md:flex-row items-center justify-between gap-4 px-2 sm:px-4 py-4 border-t mt-6 rounded-b-lg font-shafarik hidden">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-gray-600">View</span>
          <select
            className="rounded px-2 py-1 text-xs sm:text-sm"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <span className="text-gray-600">applications per page</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm ">
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
};

export default ApplicationsListTable;
