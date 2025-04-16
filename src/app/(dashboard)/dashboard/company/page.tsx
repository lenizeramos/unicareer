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
import { fetchCompanyJobs } from "@/app/context/slices/companyJobsSlice";
import { fetchCompany } from "@/app/context/slices/companySlice";
import { Ijobs } from "@/app/Types/slices";
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
};

const getDashboardData = (companyJobs: Ijobs[]): IDashboardData => {
  if (!companyJobs.length) return defaultDashboardData;

  const jobOpen = companyJobs.filter((job) => job.status === "OPEN").length;

  const totalApplications = companyJobs.reduce(
    (acc, job) => acc + (job.applications?.length || 0),
    0
  );

  const applicationsSummary = defaultDashboardData.applicationsSummary.map(
    (item) => ({
      ...item,
      count: 0,
    })
  );

  companyJobs.forEach((job) => {
    if (job.applications?.length) {
      const applicationSummary = applicationsSummary.find(
        (a) => a.label.toLowerCase() === job.type?.toLowerCase()
      );
      if (applicationSummary) {
        applicationSummary.count += job.applications.length;
      }
    }
  });

  return {
    ...defaultDashboardData,
    jobOpen,
    totalApplications,
    applicationsSummary,
  };
};

const CompanyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companyJobs = useSelector((state: RootState) => state.companyJobs.jobs);
  const company = useSelector((state: RootState) => state.companyState.company);
  const [jobViewCount, setJobViewCount] = useState(0);

 /*  const startDefault = new Date();
  const endDefault = new Date();
  startDefault.setDate(startDefault.getDate() - 5); */
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  useEffect(() => {
    dispatch(fetchCompanyJobs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  useEffect(() => {
    let queryParams = "";
    if (startDate && endDate) {
      queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    const fetchJobViewCount = async () => {
      const res = await fetch(
        `/api/job/total-views${queryParams}`,
      );
      const data = await res.json();
      setJobViewCount(data);
    };

    fetchJobViewCount();
  }, [startDate, endDate, companyJobs]);

  const dashboardData = useMemo(() => {
    const baseData = getDashboardData(companyJobs);
    return {
      ...baseData,
      jobView: jobViewCount,
    };
  }, [companyJobs, jobViewCount]);

  const jobUpdatesCards = useMemo(
    () =>
      companyJobs
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
    [companyJobs]
  );

  const getDate = (date: Date | undefined | null) => {
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = date;
    console.log(createDate.toUTCString(), "createDateeeee");
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
            Here is job applications status
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
        <h2 className="text-xl font-semibold text-gray-900">Job statistics</h2>

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

export default CompanyPage;
