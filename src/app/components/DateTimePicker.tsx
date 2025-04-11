import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { FcCalendar } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker: React.FC = () => {
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

  return (
    <div className={`flex items-center gap-[10px]`}>
      <span className="font-[1rem] cursor-pointer py-[0.5rem] px-[1rem] border-[1px] border-gray-200 inline-flex items-center gap-[0.5rem]">
        {displayText}
        <FcCalendar onClick={() => pickerRef.current?.setOpen(true)} />
      </span>
      <DatePicker
        ref={pickerRef}
        selected={startDate}
        onChange={(update: [Date | null, Date | null]) => {
          setDateRange(update);
        }}
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        selectsRange
        customInput={<div className="hidden" />}
      />
    </div>
  );
};

export default DateRangePicker;
