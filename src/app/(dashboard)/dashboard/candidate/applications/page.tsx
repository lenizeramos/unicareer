"use client";

import DashboardNavbar from "@/app/components/DashboardNavbar";
import Loader from "@/app/components/Loader";
import { columnNames } from "@/app/constants";
import { useCandidateData } from "@/Lib/client/candidate";
import { useState } from "react";
import { statusTags } from "@/app/constants";
import { BsSearch } from "react-icons/bs";
import SummaryTable from "@/app/components/SummaryTable";
import SearchNotFound from "@/app/components/SearchNotFound";
import DashboardWelcome from "@/app/components/DashboardWelcome";

export default function Application() {
  const { candidate, isLoading } = useCandidateData();

  const [endDate] = useState<Date | null>();
  const [active, setActive] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filters = (candidate.applications || []).filter((item) => {
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
      userData: { name: companyName, pic: logo },
      jobTitle: application.job?.title ?? "Unknown",
      jobId: application.job?.id ?? "Unknown",
      date: application.appliedAt,
      tags: application.status ?? "Unknown",
    };
  });
  return (
    <>
      <DashboardNavbar
        title="My Applications"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <DashboardWelcome
        greeting={`Keep it up, ${candidate.firstName}`}
        message="Here is job applications status "
      />
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
            <SummaryTable columnNames={columnNames} data={data} isUserPhoto={false}/>
          </div>
        )}
      </div>
    </>
  );
}
