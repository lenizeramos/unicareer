"use client";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import { SlArrowRight } from "react-icons/sl";
import StatusCard from "@/app/components/StatusCard";
import ApplicantsSummary from "@/app/components/ApplicantsSummary";
import CompanyChart from "@/app/components/CompanyChart";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect, useMemo } from "react";
import { fetchCompanyJobs } from "@/app/context/slices/companyJobsSlice";
import { Ijobs } from "@/app/Types/slices";
import { IDashboardData } from "@/app/Types";

const defaultDashboardData: IDashboardData = {
  totalApplications: 0,
  jobView: 0,
  jobOpen: 0,
  applicantsSummary: [
    { label: "Full-Time", count: 0, color: "bg-pink-500" },
    { label: "Part-Time", count: 0, color: "bg-green-500" },
    { label: "Remote", count: 0, color: "bg-blue-500" },
    { label: "Internship", count: 0, color: "bg-yellow-500" },
    { label: "Contract", count: 0, color: "bg-red-500" },
    { label: "Freelance", count: 0, color: "bg-purple-500" },
  ],
};

const cards = [
  {
    title: "New candidates to review",
    value: 76,
    icon: <SlArrowRight />,
    color: "text-white",
    backgroundColor: "bg-blue-500",
  },
  {
    title: "Schedule for today",
    value: 3,
    icon: <SlArrowRight />,
    color: "text-white",
    backgroundColor: "bg-green-500",
  },
  {
    title: "Messages received",
    value: 24,
    icon: <SlArrowRight />,
    color: "text-white",
    backgroundColor: "bg-purple-500",
  },
];

const getDashboardData = (companyJobs: Ijobs[]): IDashboardData => {
  if (!companyJobs.length) return defaultDashboardData;

  const jobOpen = companyJobs.filter((job) => job.status === "OPEN").length;

  const totalApplications = companyJobs.reduce(
    (acc, job) => acc + (job.applications?.length || 0),
    0
  );

  const applicantsSummary = defaultDashboardData.applicantsSummary.map(
    (item) => ({
      ...item,
      count: 0,
    })
  );

  companyJobs.forEach((job) => {
    if (job.applications?.length) {
      const applicantSummary = applicantsSummary.find(
        (a) => a.label.toLowerCase() === job.type?.toLowerCase()
      );
      if (applicantSummary) {
        applicantSummary.count += job.applications.length;
      }
    }
  });

  return {
    ...defaultDashboardData,
    jobOpen,
    totalApplications,
    applicantsSummary,
  };
};

const CompanyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companyJobs = useSelector((state: RootState) => state.companyJobs.jobs);

  useEffect(() => {
    if (companyJobs.length === 0) {
      dispatch(fetchCompanyJobs());
    }
  }, [dispatch, companyJobs.length]);

  const dashboardData = useMemo(
    () => getDashboardData(companyJobs),
    [companyJobs]
  );

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

  return (
    <div className="space-y-8 pb-8">
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight} />

      <DashboardWelcome
        greeting="Good Morning, Sam"
        message="Here is what's happening with your job applications from July 19 - July 25."
        date="Jul 19 - Jul 25"
      />

      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <StatusCard key={index} {...card} />
          ))}
        </div>
      </section>

      <section className="space-y-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Job statistics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <CompanyChart />
          </div>

          <div className="space-y-4">
            <StatusCard
              title="Total Applications"
              value={dashboardData.totalApplications}
              trend="up"
              percentage="0.5%"
            />
            <StatusCard
              title="Job View"
              value={dashboardData.jobView}
              trend="down"
              percentage="0.5%"
            />
          </div>

          <div className="flex flex-col gap-4">
            <StatusCard
              title="Job Open"
              value={dashboardData.jobOpen}
              icon={<SlArrowRight />}
            />

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <ApplicantsSummary
                applicants={dashboardData.applicantsSummary}
                totalApplicants={dashboardData.totalApplications}
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
