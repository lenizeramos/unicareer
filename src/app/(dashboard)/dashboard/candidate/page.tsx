"use client";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import JobAppliedGraphic from "@/app/components/Cards/JobAppliedGraphic";
import { useCandidateData } from "@/Lib/client/candidate";
import Loader from "@/app/components/Loader";
import { IApplication } from "@/app/Types/slices";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "@/app/Types";

export default function CandidatePage() {
  const { candidate, isLoading } = useCandidateData();

  const [dateRange, setDateRange] = useState<DateRange>({
    firstDate: null,
    secondDate: null,
  });
  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  }
  if (!candidate) {
    return <p>Not found</p>;
  }

  const getFrequencies = (arr: IApplication[], key: keyof IApplication) => {
    const freq: Record<string, number> = {};

    arr.forEach((item) => {
      const value = item[key];
      if (typeof value === "string") {
        freq[value] = (freq[value] || 0) + 1;
      }
    });

    return freq;
  };
  const { firstDate, secondDate } = dateRange;

  const filterDate = candidate.applications.filter(app =>
    secondDate ? new Date(app.appliedAt) < secondDate : true
  );

  const freq = getFrequencies(filterDate, "status");

  const pendingCount = freq["PENDING"] || 0;
  const interviewedCount = freq["INTERVIEWED"] || 0;
  const rejectedCount = freq["REJECTED"] || 0;
  const hiredCount = freq["HIRED"] || 0;
  const cancelledCount = freq["CANCELLED_JOB"] || 0;
  const total = Object.values(freq).reduce((sum, count) => sum + count, 0);

  const data = candidate.applications
    .map((application) => ({
      companyname: application.job?.company?.name ?? "Unknown Company",
      logo: application.job?.company?.userId ?? "/img/img.png",
      title: application.job?.title ?? "Unknown",
      location: application.job?.location ?? "Unknown",
      date: application.appliedAt,
      progress: application.status ?? "Unknown",
    }))
    .slice(0, 3);

  const handleOnClick = () => {
    router.push("/dashboard/candidate/applications");
  };
  return (
    <>
      <DashboardNavbar
        title="Dashboard"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <DashboardWelcome
        greeting={`Good Morning, ${candidate.firstName}`}
        message="Here is what's happening with your job applications "
        updateDate={setDateRange}
      />
      <JobAppliedGraphic
        pendingCount={pendingCount}
        interviewedCount={interviewedCount}
        rejectedCount={rejectedCount}
        hiredCount={hiredCount}
        cancelledCount={cancelledCount}
        total={total}
      />
      <div className="flex flex-col gap-5">
        <h2 className="p-5 border-b border-gray-200 font-semibold font-shafarik text-xl">
          Recent Applications History
        </h2>
        <CardsContainer
          cardId="recentApply"
          params={data}
          styles="w-fit flex flex-col gap-5 mx-auto "
        />
        <button
          className="text-indigo-600 text-lg font-shafarik flex items-center gap-2 cursor-pointer mx-auto"
          onClick={handleOnClick}
        >
          View all applications history
          <IoIosArrowRoundForward size={20} />
        </button>
      </div>
    </>
  );
}
