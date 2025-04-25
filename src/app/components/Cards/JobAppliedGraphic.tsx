import React from "react";
import CompanyChart from "../CompanyChart";
import CardsContainer from "./CardsContainer";
import { FaClipboardList } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import SearchNotFound from "../SearchNotFound";

const JobAppliedGraphic = ({
  pendingCount,
  interviewedCount,
  rejectedCount,
  hiredCount,
  total,
  cancelledCount,
}: {
  pendingCount: number;
  interviewedCount: number;
  rejectedCount: number;
  hiredCount: number;
  total: number;
  cancelledCount: number;
}) => {
  const data = [
    {
      title: "Total Jobs Applied",
      total: total,
      icon: FaClipboardList,
      styleCard: "bg-gray-50 rounded-lg shadow-sm",
    },
    {
      title: "Interviewed",
      total: interviewedCount,
      icon: LuMessagesSquare,
      styleCard: "bg-gray-50 rounded-lg shadow-sm",
    },
  ];
  return (
    <div className="flex md:flex-row flex-col justify-center md:gap-20 gap-10 p-6 items-center">
      <CardsContainer
        cardId="dashboardCard"
        params={data}
        styles="flex md:flex-col gap-5 justify-center items-center"
      />

      <div className="bg-gray-50 shadow-md rounded-lg p-4 border border-gray-100">
        <h2 className="text-lg font-semibold font-shafarik">
          Jobs Applied Status
        </h2>
        {total === 0 ? (
          <SearchNotFound text="No applications submitted on these dates." />
        ) : (
          <CompanyChart
            inReview={pendingCount}
            Interviewed={interviewedCount}
            Unsuitable={rejectedCount}
            Hired={hiredCount}
            Cancelled={cancelledCount}
          />
        )}
      </div>
    </div>
  );
};

export default JobAppliedGraphic;
