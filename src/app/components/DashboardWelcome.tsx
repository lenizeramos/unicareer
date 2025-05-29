"use client";
import { monthNames } from "../constants";
import { styles } from "../styles";
import { IDashboardWelcome } from "../Types";
import DateRangePicker from "./DateRangePicker";
import { useState } from "react";

export default function DashboardWelcome({
  greeting,
  message,
  updateDate
}: IDashboardWelcome) {
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const getDate = (date: Date | undefined | null) => {
    if (!date) {
      return;
    }
    const createDate = date;
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };

  const isSameDate =
    endDate?.getDate() === startDate?.getDate() &&
    endDate?.getMonth() === startDate?.getMonth() &&
    endDate?.getFullYear() === startDate?.getFullYear();
  return (
    <div className="flex xs:flex-row flex-col gap-y-5 sm:justify-between justify-around xs:items-center border border-gray-200 px-5 py-8 w-full relative">
      <div className="">
        <h2
          className={`${styles.JobDescriptionTitle} sm:text-justify text-center`}
        >
          {greeting}
        </h2>
        {!isSameDate ? (
          <p
            className={`${styles.JobDescriptionText} flex flex-col sm:flex-row text-center`}
          >
            {message}
            {startDate && endDate && (
              <>
                <span className="sm:mx-1">
                  from {getDate(startDate)} -{getDate(endDate)}
                </span>
              </>
            )}
          </p>
        ) : (
          <p className={`${styles.JobDescriptionText}`}>
            {message}
            {startDate && <span className="">in {getDate(startDate)} </span>}
          </p>
        )}
      </div>
      <div className="">
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} updateDate={updateDate}/>
      </div>
    </div>
  );
}
