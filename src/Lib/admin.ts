import { getJobsCount, getJobsWithHiredApplicationsCount, getRecentJobs } from "./job";
import { getApplicationsCount } from "./application";
import { getCompanyCount } from "./company";
import { getCandidateCount } from "./candidate";
import {
  getCompletedCompanyPaymentsCount,
  getPendingCompanyPaymentsCount,
} from "./companyPayments";
import {
  getActiveCompanyMembershipCount,
  getInactiveCompanyMembershipCount,
} from "./companyMembership";

export async function getAdminDashboardData(startDate?: Date, endDate?: Date) {
  try {
    const [
      jobsCount,
      jobsWithHiredApplicationsCount,
      applicationsCount,
      companiesCount,
      candidatesCount,
      completedPaymentsCount,
      pendingPaymentsCount,
      activeMembershipCount,
      inactiveMembershipCount,
      recentJobs
    ] = await Promise.all([
      getJobsCount(startDate, endDate),
      getJobsWithHiredApplicationsCount(startDate, endDate),
      getApplicationsCount(startDate, endDate),
      getCompanyCount(startDate, endDate),
      getCandidateCount(startDate, endDate),
      getCompletedCompanyPaymentsCount(startDate, endDate),
      getPendingCompanyPaymentsCount(startDate, endDate),
      getActiveCompanyMembershipCount(startDate, endDate),
      getInactiveCompanyMembershipCount(startDate, endDate),
      getRecentJobs(6, startDate, endDate)
    ]);

    return {
      jobsCount,
      jobsWithHiredApplicationsCount,
      applicationsCount,
      companiesCount,
      candidatesCount,
      completedPaymentsCount,
      pendingPaymentsCount,
      activeMembershipCount,
      inactiveMembershipCount,
      recentJobs
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to load dashboard data due to database issue.");
  }
}
