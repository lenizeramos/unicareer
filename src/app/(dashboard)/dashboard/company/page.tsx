"use client";
import { styles } from "@/app/styles";
import { SlArrowRight } from "react-icons/sl";
import { FaUserCheck, FaEye } from "react-icons/fa";
import StatusCard from "@/app/components/StatusCard";
import ApplicationsSummary from "@/app/components/ApplicationsSummary";
import CompanyChart from "@/app/components/CompanyChart";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect, useMemo, useState } from "react";
import { fetchCompany } from "@/app/context/slices/companySlice";
import { IDashboardData } from "@/app/Types";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";
import { jobsTypes } from "@/app/constants/index";

const defaultDashboardData: IDashboardData = {
  totalApplications: 0,
  jobView: 0,
  jobOpen: 0,
  applicationsSummary: jobsTypes.map((type) => ({
    label: type,
    count: 0,
  })),
  companyJobs: [],
};

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector((state: RootState) => state.companyState.company);
  const [dashboardData, setDashboardData] =
    useState<IDashboardData>(defaultDashboardData);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  useEffect(() => {
    let queryParams = "";
    if (startDate && endDate) {
      queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    const fetchDashboard = async () => {
      const res = await fetch(`/api/company/dashboard${queryParams}`);
      const data = await res.json();

      const transformedData: IDashboardData = {
        totalApplications: data.totalApplications || 0,
        jobView: data.jobView || 0,
        jobOpen: data.jobOpen || 0,
        applicationsSummary: jobsTypes.map((type) => ({
          label: type,
          count: data.applicationsSummary?.[type.toLowerCase()] || 0,
        })),
        companyJobs: data.companyJobs || [],
      };

      setDashboardData(transformedData);
    };

    fetchDashboard();
  }, [startDate, endDate]);

  const jobUpdatesCards = useMemo(
    () =>
      dashboardData?.companyJobs
        .filter((job) => job.status === "OPEN")
        .map((job) => ({
          title: job.title,
          cardId: "jobUpdates",
          logo: "logo",
          subtitle: job.location || "No location",
          alt: "Job image",
          categories: Array.isArray(job.categories)
            ? job.categories.join(", ")
            : job.categories || "Uncategorized",
          type: job.type || "N/A",
        })),
    [dashboardData?.companyJobs]
  );

  const getDate = (date: Date | undefined | null) => {
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = date;

    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };

  return (
    <div className="space-y-8 pb-8">
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight} />

      <div className="flex xs:flex-row flex-col gap-y-5 justify-between xs:items-center border border-gray-200 px-5 py-8 w-full">
        <div>
          <h3 className={`${styles.JobDescriptionTitle}`}>
            Hello, {company?.name}
          </h3>
          <p className={`${styles.JobDescriptionText}`}>
            Track how your job postings are performing{" "}
            {startDate && endDate && (
              <>
                from {getDate(startDate)} - {getDate(endDate)}
              </>
            )}
          </p>
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      <section className="space-y-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 font-shafarik">Job Statistics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <CompanyChart
              totalApplications={dashboardData.totalApplications}
              totalJobView={dashboardData.jobView}
            />
          </div>

          <div className="space-y-4">
            <StatusCard
              title="Total Applications"
              value={dashboardData.totalApplications}
              icon={<FaUserCheck />}
            />
            <StatusCard
              title="Job View"
              value={dashboardData.jobView}
              icon={<FaEye />}
            />
          </div>

          <div className="flex flex-col gap-4">
            <StatusCard
              title="Job Open"
              value={dashboardData.jobOpen}
              icon={<SlArrowRight />}
            />

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <ApplicationsSummary
                applications={dashboardData.applicationsSummary}
                totalApplications={dashboardData.totalApplications}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Job Updates</h2>
          <Link
            href="/dashboard/company/joblisting"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All <GoArrowRight className="ml-1 text-lg" />
          </Link>
        </div>

        <CardsContainer cardId="jobUpdates" params={jobUpdatesCards} />
      </section>
    </div>
  );
};

export default DashboardPage;
