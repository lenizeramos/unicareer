import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import { FaPlus } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import StatusCard from "@/app/components/Cards/StatusCard";
import ApplicantsSummary from "@/app/components/ApplicantsSummary";
import CompanyChart from "@/app/components/Chart";

const MiniStatCard = ({
  title,
  value,
  trend,
  percentage,
}: {
  title: string;
  value: string | number;
  trend: "up" | "down";
  percentage: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <div
          className={`flex items-center ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          <span className="text-sm font-medium">{percentage}</span>
          {trend === "up" ? (
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const CompanyPage = () => {
  return (
    <>
      <CompanyHeader
        image="/img/company_logo.png"
        name="Nomad"
        button={{
          text: "Post a Job",
          IsWhite: false,
          width: "w-xs",
          icon: <FaPlus />,
        }}
      />
      <div className={styles.borderBottomLight}></div>
      <DashboardWelcome
        greeting="Good Morning, Sam"
        message="Here is what’s happening with your job applications from July 19 - July 25."
        date="Jul 19 - Jul 25"
      />

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatusCard
          title="New candidates to review"
          value={76}
          icon={<SlArrowRight />}
          color="text-white"
          backgroundColor="bg-blue-400"
        />
        <StatusCard
          title="Schedule for today"
          value={3}
          icon={<SlArrowRight />}
          color="text-white"
          backgroundColor="bg-green-400"
        />
        <StatusCard
          title="Messages received"
          value={24}
          icon={<SlArrowRight />}
          color="text-white"
          backgroundColor="bg-purple-400"
        />
      </div>
      <div className="">
        <CompanyChart />
        <MiniStatCard
          title="Job Applied"
          value={654}
          trend="up"
          percentage="0.5%"
        />
      </div>

      <ApplicantsSummary />
    </>
  );
};

export default CompanyPage;
