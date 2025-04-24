import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { FcCalendar } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";
import { IDateRangePicker } from "../Types";

const DateRangePicker = ({
  setStartDate,
  setEndDate,
  updateDate,
}: IDateRangePicker) => {
  const firstDate = new Date();
  const secondDate = new Date();
  secondDate.setDate(firstDate.getDate() - 5);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    secondDate,
    firstDate,
  ]);
  const [startDate, endDate] = dateRange;

  const pickerRef = useRef<any>(null);

  const isSameDate = (a: Date | null, b: Date | null): boolean => {
    if (!a || !b) return false;
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  };

  let displayText = "";

  const now = new Date();

  if (!startDate || !endDate) {
    displayText = "Select a date range";
  } else {
    const now = new Date();
    const sameDate = isSameDate(startDate, endDate);
    const startInPast = startDate < now;
    const endInPast = endDate < now;
    const startInFuture = startDate > now;
    const endInFuture = endDate > now;

    if (startInPast && endInPast && !sameDate) {
      displayText = `${format(startDate, "MMM d")} – ${format(
        endDate,
        "MMM d"
      )}`;
    } else if (startInPast && endInFuture) {
      displayText = `${format(startDate, "MMM d")} – ${format(now, "MMM d")}`;
    } else if (startInFuture && endInFuture) {
      displayText = `${format(now, "MMM d")}`;
    } else if (sameDate && startInPast) {
      displayText = `${format(startDate, "MMM d")}`;
    } else if (sameDate && startInFuture) {
      displayText = `${format(now, "MMM d")}`;
    } else {
      displayText = "Select a date range";
    }
  }

  const handleOnChange = (update: [Date | null, Date | null]) => {
    const [start, end] = update;
    const now = new Date();
    setDateRange(update);

    if (!start || !end) return;

    let firstDate = start;
    let secondDate = end;

    if (start < now && end < now) {
    } else if (start < now && end > now) {
      secondDate = now;
    } else if (start > now && end > now) {
      firstDate = now;
      secondDate = now;
    }

    setStartDate(firstDate);
    setEndDate(secondDate);

    if (updateDate) {
      updateDate({ firstDate, secondDate });
    }
  };

  return (
    <div className={`flex items-center justify-center gap-[5px]`}>
      <DatePicker
        ref={pickerRef}
        selected={startDate}
        onChange={handleOnChange}
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        selectsRange
        customInput={<div className="hidden" />}
      />
      <span
        className="font-[1rem] cursor-pointer py-[0.5rem] sm:px-[1rem] px-[0.5rem] border-[1px] border-gray-200 inline-flex items-center gap-[0.5rem] text-[13px]"
        onClick={() => pickerRef.current?.setOpen(true)}
      >
        {displayText}
        <FcCalendar />
      </span>
    </div>
  );
};

export default DateRangePicker;
