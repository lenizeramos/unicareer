"use client";

import DashboardNavbar from "@/app/components/DashboardNavbar";
import DateRangePicker from "@/app/components/DateTimePicker";
import Loader from "@/app/components/Loader";
import { columnNames, monthNames } from "@/app/constants";
import { styles } from "@/app/styles";
import { useCandidateData } from "@/Lib/client/candidate";
import { useEffect, useState } from "react";
import { IApplicantFilters } from "@/app/Types";
import { statusTags } from "@/app/constants";
import { BsSearch } from "react-icons/bs";
import SummaryTable from "@/app/components/SummaryTable";
import { AppDispatch, RootState } from "@/app/context/store";
import { useDispatch, useSelector } from "react-redux";
import { IApplicantsState } from "@/app/Types/slices";
import { fetchApplicants } from "@/app/context/slices/applicantsSlices";

export default function Application() {
  const dispatch: AppDispatch = useDispatch();
  const { applicants, loading } = useSelector(
    (state: RootState) => state.applicants as IApplicantsState
  );
  const { candidate, isLoading } = useCandidateData();
  const startDefault = new Date();
  const endDefault = new Date();
  endDefault.setDate(startDefault.getDate() + 5);

  const [startDate, setStartDate] = useState<Date | null>(startDefault);
  const [endDate, setEndDate] = useState<Date | null>(endDefault);
  const [isActive, setIsActive] = useState<string>("all");

  useEffect(() => {
    if (applicants.length === 0) {
      dispatch(fetchApplicants());
    }
  }, [applicants.length]);

  if (isLoading) {
    return <Loader />;
  }
  if (loading) {
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
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = date;
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };

  const dataCompany = candidate.applications.map((application) => {
    const companyName = application.job?.company?.name ?? "Unknown Company";
    return {
      companyName: { name: companyName, logo: "" },
      jobTitle: application.job?.title ?? "Unknown",
      dateApplied: application.appliedAt,
      status: application.status,
    };
  });

  console.log("dataCompany=>", dataCompany);
  return (
    <>
      <DashboardNavbar
        title="My Applications"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="flex justify-center gap-10 items-center border border-gray-200 px-5 py-8 w-full">
        <div className="flex justify-between w-full">
          <div>
            <h3 className={`${styles.JobDescriptionTitle}`}>
              Keep it up, {candidate.firstName}
            </h3>
            <p className={`${styles.JobDescriptionText}`}>
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
      <div className="mt-3">
        <div className="font-shafarik flex gap-20 text-lg border-b-[1px] border-gray-200 px-3 pt-3">
          {statusTags.map((status, index) => {
            return (
              <p
                id={status.id}
                key={index}
                onClick={() => setIsActive(status.id)}
                className={`${
                  isActive === status.id
                    ? "text-black font-semibold border-b-2 border-[#5939c6] px-2"
                    : "text-gray-500"
                } cursor-pointer`}
              >
                {status.type}
              </p>
            );
          })}
        </div>
        <div className="mt-10 px-3 flex justify-between">
          <h2 className="font-semibold font-monomakh text-xl">
            Applications History
          </h2>
          <div className="flex items-center border rounded-xl p-1 border-gray-400 w-fit h-fit">
            <BsSearch color="#99a1af" />
            <input
              type="text"
              placeholder="Search"
              className="font-shafarik px-3 w-[5rem] border-none outline-none"
            />
          </div>
        </div>
        <div>
          <SummaryTable columnNames={columnNames} data={dataCompany}/>
        </div>
      </div>
    </>
  );
}
