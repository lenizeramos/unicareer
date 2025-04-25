"use client";
import { styles } from "@/app/styles";
import { SlArrowRight } from "react-icons/sl";
import { FaUserCheck, FaEye } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { IoMdArrowDropright } from "react-icons/io";
import StatusCard from "@/app/components/StatusCard";
import ApplicationsSummary from "@/app/components/ApplicationsSummary";
import CompanyChart from "@/app/components/CompanyChart";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import Link from "next/link";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect, useMemo, useState } from "react";
import { fetchCompany } from "@/app/context/slices/companySlice";
import { DateRange, IDashboardData } from "@/app/Types";
import { jobsTypes } from "@/app/constants/index";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import SearchNotFound from "@/app/components/SearchNotFound";

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
  const [dateRange, setDateRange] = useState<DateRange>({
    firstDate: null,
    secondDate: null,
  });

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  const { firstDate, secondDate } = dateRange;

  useEffect(() => {
    let queryParams = "";
    if (firstDate && secondDate) {
      queryParams += `?startDate=${firstDate.toISOString()}&endDate=${secondDate.toISOString()}`;
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
  }, [firstDate, secondDate]);

  const jobUpdatesCards = useMemo(
    () =>
      dashboardData?.companyJobs
        .filter((job) => job.status === "OPEN")
        .map((job) => ({
          title: job.title,
          cardId: "jobUpdates",
          logo: company?.userId || "img/img.png",
          subtitle: job.location || "No location",
          companyname: company?.name,
          location: job.location,
          alt: "Job image",
          categories: Array.isArray(job.categories)
            ? job.categories.join(", ")
            : job.categories || "Uncategorized",
          type: job.type || "N/A",
        })),
    [dashboardData?.companyJobs, company?.name, company?.userId]
  );

  const data = [
    {
      title: "Total Applications",
      total: dashboardData.totalApplications,
      icon: FaUserCheck,
      styleCard: "bg-gray-50 rounded-lg shadow-sm",
    },
    {
      title: "Job View",
      total: dashboardData.jobView,
      icon: FaEye,
      styleCard: "bg-gray-50 rounded-lg shadow-sm",
    },
  ];

  const extradata = [
    {
      title: "Jobs Open",
      total: dashboardData.jobOpen,
      icon: IoMdArrowDropright,
      styleCard: "bg-gray-50 rounded-lg shadow-sm",
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div>
        <CompanyHeaderPaymentButton />
        <DashboardWelcome
          greeting={`Hello, ${company?.name}`}
          message="Track how your job postings are performing"
          updateDate={setDateRange}
        />
      </div>

      <section className="space-y-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 font-shafarik">
          Job Statistics
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
            {dashboardData.totalApplications === 0 &&
            dashboardData.jobView === 0 ? (
              <SearchNotFound text="No views or applications have been recorded on these dates." />
            ) : (
              <CompanyChart
                totalApplications={dashboardData.totalApplications}
                totalJobView={dashboardData.jobView}
              />
            )}
          </div>

          <CardsContainer
            cardId="dashboardCard"
            params={data}
            styles="flex lg:flex-col xs:flex-row flex-col gap-5 justify-center items-center"
          />

          <div className="flex flex-col gap-4">
            <CardsContainer
              cardId="dashboardCard"
              params={extradata}
              styles="flex md:flex-col gap-5 justify-center items-center"
            />

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm font-shafarik">
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
          <h2 className="text-xl font-semibold text-gray-900 font-shafarik">Job Updates</h2>
          <Link
            href="/dashboard/company/joblisting"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-shafarik"
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
