import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { FcCalendar } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({
  setStartDate,
  setEndDate,
}: {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}) => {
  const firstDate = new Date();
  const secondDate = new Date();
  secondDate.setDate(firstDate.getDate() - 5);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    secondDate,
    firstDate,
  ]);
  const [startDate, endDate] = dateRange;

  const pickerRef = useRef<any>(null);

  const isSameDate =
    endDate?.getDate() === startDate?.getDate() &&
    endDate?.getMonth() === startDate?.getMonth() &&
    endDate?.getFullYear() === startDate?.getFullYear();

  let displayText = "";

  switch (true) {
    case startDate && startDate < new Date() && isSameDate:
      displayText = `${format(startDate, "MMM d")}`;
      break;

    case startDate && endDate && startDate < new Date() && endDate > new Date():
      displayText = `${format(startDate, "MMM d")} – ${format(
        new Date(),
        "MMM d"
      )}`;
      break;

    case startDate && endDate && startDate > new Date() && endDate > new Date():
      displayText = `${format(new Date(), "MMM d")}`;
      break;

    case startDate && endDate && startDate < new Date() && endDate < new Date():
      displayText = `${format(startDate, "MMM d")} – ${format(
        endDate,
        "MMM d"
      )}`;
      break;

    default:
      displayText = "Select a date range";
      break;
  }

  const handleOnChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    const [start, end] = update;
    switch (true) {
      case start && end && end < new Date() && start < new Date():
        setStartDate(start);
        setEndDate(end);
        break;
      case start && end && end > new Date() && start < new Date():
        setStartDate(start);
        setEndDate(new Date());
        break;
      case start && end && start > new Date() && end > new Date():
        setStartDate(new Date());
        setEndDate(new Date());
        break;
      default:
        break;
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
        className="font-[1rem] cursor-pointer py-[0.5rem] sm:px-[1rem] px-[0.5rem] border-[1px] border-gray-200 inline-flex items-center gap-[0.5rem] sm:text-[14px] text-[10px]"
        onClick={() => pickerRef.current?.setOpen(true)}
      >
        {displayText}
        <FcCalendar />
      </span>
    </div>
  );
};

export default DateRangePicker;

