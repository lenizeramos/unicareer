"use client";
import { useEffect, useState } from "react";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import { GrDocumentText } from "react-icons/gr";
import { LuMessageCircleQuestion } from "react-icons/lu";
import {
  BiBriefcase,
  BiCheckCircle,
  BiDollar,
  BiGroup,
  BiTime,
  BiUser,
} from "react-icons/bi";
import { DateRange, ICards } from "@/app/Types";
import { Ijobs } from "@/app/Types/slices";

const defaultDashboardData = {
  jobsCount: 0,
  jobsWithHiredApplicationsCount: 0,
  applicationsCount: 0,
  companiesCount: 0,
  candidatesCount: 0,
  completedPaymentsCount: 0,
  pendingPaymentsCount: 0,
  activeMembershipCount: 0,
  inactiveMembershipCount: 0,
  jobsCards: [],
};

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    firstDate: null,
    secondDate: null,
  });

  const { firstDate, secondDate } = dateRange;
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);

  useEffect(() => {
    let queryParams = "";
    if (firstDate && secondDate) {
      queryParams += `?startDate=${firstDate.toISOString()}&endDate=${secondDate.toISOString()}`;
    }
    const fetchDashboard = async () => {
      const res = await fetch(`/api/admin/dashboard${queryParams}`);
      const data = await res.json();

      console.log("dataaaaa", data);

      const transformedData = {
        jobsCount: data.jobsCount || 0,
        jobsWithHiredApplicationsCount:
          data.jobsWithHiredApplicationsCount || 0,
        applicationsCount: data.applicationsCount || 0,
        companiesCount: data.companiesCount || 0,
        candidatesCount: data.candidatesCount || 0,
        completedPaymentsCount: data.completedPaymentsCount || 0,
        pendingPaymentsCount: data.pendingPaymentsCount || 0,
        activeMembershipCount: data.activeMembershipCount || 0,
        inactiveMembershipCount: data.inactiveMembershipCount || 0,
        jobsCards:
          data.recentJobs.map((job: Ijobs) => {
            return {
              title: job.title,
              date: job.createdAt,
              companyname: job.company?.name,
              text: job.type,
              location: job.location,
              logo: job.company?.userId,
            } as ICards;
          }) || [],
      };

      setDashboardData(transformedData);
    };

    fetchDashboard();
  }, [firstDate, secondDate]);

  return (
    <>
      <DashboardNavbar
        title="Dashboard"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className={styles.borderBottomLight}></div>
      <DashboardWelcome
        greeting="Hello"
        message="Here is what's happening with the system"
        updateDate={setDateRange}
      />
      <div className="w-full flex justify-center items-center flex-col gap-5 p-4">
        <div className="flex flex-row gap-5 w-full justify-center items-center max-w-6xl">
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Total Companies",
                total: dashboardData.companiesCount,
                icon: BiBriefcase,
                cardId: "dashboardCard",
              },
            ]}
          />
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Total Jobs Posted",
                total: dashboardData.jobsCount,
                icon: GrDocumentText,
                cardId: "dashboardCard",
              },
            ]}
          />
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Hired Positions",
                total: dashboardData.jobsWithHiredApplicationsCount,
                icon: BiCheckCircle,
                cardId: "dashboardCard",
              },
            ]}
          />
        </div>

        <div className="flex flex-row gap-5 w-full justify-center items-center max-w-6xl">
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Total Candidates",
                total: dashboardData.candidatesCount,
                icon: BiUser,
                cardId: "dashboardCard",
              },
            ]}
          />
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Total Applications",
                total: dashboardData.applicationsCount,
                icon: LuMessageCircleQuestion,
                cardId: "dashboardCard",
              },
            ]}
          />
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Active Memberships",
                total: dashboardData.activeMembershipCount,
                icon: BiGroup,
                cardId: "dashboardCard",
              },
            ]}
          />
        </div>

        <div className="flex flex-row gap-5 w-full justify-center items-center max-w-6xl">
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Completed Payments",
                total: dashboardData.completedPaymentsCount,
                icon: BiDollar,
                cardId: "dashboardCard",
              },
            ]}
          />
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Pending Payments",
                total: dashboardData.pendingPaymentsCount,
                icon: BiTime,
                cardId: "dashboardCard",
              },
            ]}
          />
          <CardsContainer
            cardId={"dashboardCard"}
            params={[
              {
                title: "Inactive Memberships",
                total: dashboardData.inactiveMembershipCount,
                icon: BiGroup,
                cardId: "dashboardCard",
              },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <div className={styles.borderLight + " mt-8 pl-4 pr-4 pb-4 w-3/4"}>
          <div
            className={
              styles.borderBottomLight +
              " flex justify-between items-center p-8 mb-8"
            }
          >
            <h2 className="text-xl text-title-color font-bold">
              Recent Jobs Posted
            </h2>
          </div>
          
         <CardsContainer
              cardId={"recentPosted"}
              params={dashboardData.jobsCards}
            />
        </div>
      </div>
    </>
  );
}
