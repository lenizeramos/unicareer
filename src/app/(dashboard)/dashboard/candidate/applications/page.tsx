"use client";

import DashboardNavbar from "@/app/components/DashboardNavbar";
import DateRangePicker from "@/app/components/DateRangePicker";
import Loader from "@/app/components/Loader";
import { columnNames, monthNames } from "@/app/constants";
import { styles } from "@/app/styles";
import { useCandidateData } from "@/Lib/client/candidate";
import { useEffect, useState } from "react";
import { statusTags } from "@/app/constants";
import { BsSearch } from "react-icons/bs";
import SummaryTable from "@/app/components/SummaryTable";
import { AppDispatch, RootState } from "@/app/context/store";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationsState } from "@/app/Types/slices";
import { fetchApplications } from "@/app/context/slices/applicationsSlices";
import SearchNotFound from "@/app/components/SearchNotFound";

export default function Application() {
  const dispatch: AppDispatch = useDispatch();
  const { applications, loading } = useSelector(
    (state: RootState) => state.applications as IApplicationsState
  );
  const { candidate, isLoading } = useCandidateData();

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [active, setActive] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (applications.length === 0) {
      dispatch(fetchApplications());
    }
  }, [applications.length]);

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
      return;
    }
    const createDate = date;
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };

  const filters = candidate.applications.filter((item) => {
    const jobsByDate = endDate
      ? new Date(item.appliedAt) < endDate
        ? item
        : ""
      : true;
    const companyName = item.job?.company?.name?.toLowerCase() ?? "";
    const jobTitle = item.job?.title?.toLowerCase() ?? "";
    const search = searchTerm.toLowerCase();
    const matchesName = companyName.includes(search);
    const matchesJob = jobTitle.includes(search);
    const matchesStatus =
      active === "all" ? true : (item.status ?? "").toLowerCase() === active;
    return (matchesName || matchesJob) && matchesStatus && jobsByDate;
  });

  const data = filters.map((application) => {
    const companyName = application.job?.company?.name ?? "Unknown Company";
    const logo = application.job?.company?.userId ?? "/img/img.png";
    return {
      companyName: { name: companyName, logo: logo },
      jobTitle: application.job?.title ?? "Unknown",
      dateApplied: application.appliedAt,
      status: application.status ?? "Unknown",
    };
  });
  const isSameDate =
    endDate?.getDate() === startDate?.getDate() &&
    endDate?.getMonth() === startDate?.getMonth() &&
    endDate?.getFullYear() === startDate?.getFullYear();
  return (
    <>
      <DashboardNavbar
        title="My Applications"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="flex xs:flex-row flex-col gap-y-5 sm:justify-between justify-around xs:items-center border border-gray-200 px-5 py-8 w-full relative">
        <div>
          <h3
            className={`${styles.JobDescriptionTitle} sm:text-justify text-center`}
          >
            Keep it up, {candidate.firstName}
          </h3>
          {!isSameDate ? (
            <p
              className={`${styles.JobDescriptionText} flex flex-col sm:flex-row text-center`}
            >
              Here is job applications status{" "}
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
              Here is job applications status{" "}
              {startDate && (
                <span className="">in {getDate(startDate)} </span>
              )}
            </p>
          )}
        </div>
        <div className="">
          <DateRangePicker
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="font-shafarik flex md:gap-20 sm:gap-15 gap-5 sm:text-lg text-[14px] border-b-[1px] border-gray-200 px-3 pt-3">
          {statusTags.map((status, index) => {
            return (
              <p
                id={status.id}
                key={index}
                onClick={() => setActive(status.id)}
                className={`${
                  active === status.id
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
          <h2 className="font-semibold font-shafarik text-xl">
            Applications History
          </h2>
          <div className="flex items-center border rounded-xl p-1 border-gray-400 w-fit h-fit">
            <BsSearch color="#99a1af" />
            <input
              type="text"
              placeholder="Search"
              className="font-shafarik px-3 w-[5rem] sm:text-md text-sm border-none outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {data.length === 0 ? (
          <SearchNotFound text="No applicantions found" />
        ) : (
          <div>
            <SummaryTable columnNames={columnNames} data={data} />
          </div>
        )}
      </div>
    </>
  );
}
