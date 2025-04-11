"use client";

import DashboardNavbar from "@/app/components/DashboardNavbar";
import DateRangePicker from "@/app/components/DateTimePicker";
import Loader from "@/app/components/Loader";
import { useCandidateData } from "@/Lib/client/candidate";

export default function Application() {
  const { candidate, isLoading } = useCandidateData();
  if(isLoading) {
    return <Loader />
  }
  if (!candidate) {
    return (
      <>
        <p>Not Found</p>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar
        title="My Applications"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="flex justify-center gap-10 items-center border border-gray-200 px-5 py-8 w-fit">
        <div><DateRangePicker /></div>
      </div>
    </>
  );
}
