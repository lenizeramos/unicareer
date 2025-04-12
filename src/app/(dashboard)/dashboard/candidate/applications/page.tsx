"use client";

import DashboardNavbar from "@/app/components/DashboardNavbar";
import DateRangePicker from "@/app/components/DateTimePicker";
import Loader from "@/app/components/Loader";
import { monthNames } from "@/app/constants";
import { styles } from "@/app/styles";
import { useCandidateData } from "@/Lib/client/candidate";
import { useState } from "react";

export default function Application() {
  const { candidate, isLoading } = useCandidateData();
  const startDefault = new Date();
  const endDefault = new Date();
  endDefault.setDate(startDefault.getDate() + 5);

  const [startDate, setStartDate] = useState<Date | null>(startDefault);
  const [endDate, setEndDate] = useState<Date | null>(endDefault);
  if (isLoading) {
    return <Loader />;
  }
  if (!candidate) {
    return (
      <>
        <p>Not Found</p>
      </>
    );
  }

  const getDate = (date: Date | undefined | null) => {
    if(!date) {
        return <p>Not Found</p>
    }
    const createDate = date;
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };

  return (
    <>
      <DashboardNavbar
        title="My Applications"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="flex justify-center gap-10 items-center border border-gray-200 px-5 py-8 w-full">
        <div className="flex justify-between w-full">
          <div>
            <h3 className={`${styles.JobDescriptionText}`}>
              Keep it up, {candidate.firstName}
            </h3>
            <p>
              Here is job applications status from {getDate(startDate)} -
              {getDate(endDate)}
            </p>
          </div>
          <DateRangePicker
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
    </>
  );
}
