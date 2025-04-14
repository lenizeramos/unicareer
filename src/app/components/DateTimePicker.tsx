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
  const startDefault = new Date();
  const endDefault = new Date();
  endDefault.setDate(startDefault.getDate() + 5);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    startDefault,
    endDefault,
  ]);
  const [startDate, endDate] = dateRange;

  const pickerRef = useRef<any>(null);

  const displayText =
    startDate && endDate
      ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d")}`
      : "Select a date range";

  const handleOnChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    const [start, end] = update;
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    }
  };
  return (
    <div className={`flex items-center md:gap-[10px] gap-[5px]`}>
      <span className="font-[1rem] cursor-pointer py-[0.5rem] sm:px-[1rem] px-[0.5rem] border-[1px] border-gray-200 inline-flex items-center gap-[0.5rem] sm:text-[14px] text-[10px]">
        {displayText}
        <FcCalendar onClick={() => pickerRef.current?.setOpen(true)} />
      </span>
      <DatePicker
        ref={pickerRef}
        selected={startDate}
        onChange={handleOnChange}
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        selectsRange
        customInput={<div className="hidden" />}
      />
    </div>
  );
};

export default DateRangePicker;
