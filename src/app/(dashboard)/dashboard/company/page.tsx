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
import { useEffect } from "react";
import { fetchCompanyJobs } from "@/app/context/slices/companyJobsSlice";
import { Ijobs } from "@/app/Types/slices";


const jobTypes = [
  { label: "Full-Time", value: "full-time", color: "bg-pink-500" },
  { label: "Part-Time", value: "part-time", color: "bg-green-500" },
  { label: "Remote", value: "remote", color: "bg-blue-500" },
  { label: "Internship", value: "internship", color: "bg-yellow-500" },
  { label: "Contract", value: "contract", color: "bg-red-500" },
  { label: "Frellance", value: "frellance", color: "bg-purple-500" },
];

function getApplicantStatsByJobType(companyJobs: Ijobs[]) {
  const stats = jobTypes.map(({ label, value, color }) => {
    const jobsOfType = companyJobs.filter((job) => job.type === value);
    const totalApplications = jobsOfType.reduce(
      (acc, job) => acc + (job.applications?.length || 0),
      0
    );
    return { label, count: totalApplications, color };
  });

  const totalApplicants = companyJobs.reduce(
    (acc, job) => acc + (job.applications?.length || 0),
    0
  );

  return { applicants: stats, totalApplicants };
}

const CompanyPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const companyJobs = useSelector((state: RootState) => state.companyJobs.jobs);

  useEffect(() => {
    if (companyJobs.length === 0) {
      dispatch(fetchCompanyJobs());
    }
  }, [dispatch, companyJobs.length]);

  const { applicants, totalApplicants } =
    getApplicantStatsByJobType(companyJobs);

  return (
    <div className="space-y-8 pb-8">
      <CompanyHeaderPaymentButton />

      <div className={styles.borderBottomLight}></div>

      <DashboardWelcome
        greeting="Good Morning, Sam"
        message="Here is what's happening with your job applications from July 19 - July 25."
        date="Jul 19 - Jul 25"
      />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard
            title="New candidates to review"
            value={76}
            icon={<SlArrowRight />}
            color="text-white"
            backgroundColor="bg-blue-500"
          />
          <StatusCard
            title="Schedule for today"
            value={3}
            icon={<SlArrowRight />}
            color="text-white"
            backgroundColor="bg-green-500"
          />
          <StatusCard
            title="Messages received"
            value={24}
            icon={<SlArrowRight />}
            color="text-white"
            backgroundColor="bg-purple-500"
          />
        </div>
      </div>

      <div className="space-y-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Job statistics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <CompanyChart />
          </div>

          <div className="space-y-4">
            <StatusCard
              title="Total Applications"
              value={totalApplicants}
              trend="up"
              percentage="0.5%"
            />
            <StatusCard
              title="Job View"
              value={500}
              trend="down"
              percentage="0.5%"
            />
          </div>

          <div className="flex flex-col gap-4">
            <StatusCard
              title="Job Open"
              value={companyJobs.reduce((acc, job) => {
                return acc + (job.status === "OPEN" ? 1 : 0);
              }, 0)}
              icon={<SlArrowRight />}
            />

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <ApplicantsSummary
                applicants={applicants}
                totalApplicants={totalApplicants}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Job Updates</h2>
          <Link
            href="/dashboard/company/joblisting"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All <GoArrowRight className="ml-1 text-lg" />
          </Link>
        </div>

        <CardsContainer
          cardId="jobUpdates"
          params={companyJobs
            .map((job) => ({
              title: job.title,
              cardId: "jobUpdates",
              /* company: "Company", */
              logo: "logo",
              subtitle: job.location || "No location",
              alt: "Job image",
              categories: Array.isArray(job.categories)
                ? job.categories.join(", ")
                : job.categories || "Uncategorized",
              type: job.type || "N/A",
            }))}
        />
      </div>
    </div>
  );
};

export default CompanyPage;
