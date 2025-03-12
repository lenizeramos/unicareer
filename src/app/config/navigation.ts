import { DashboardType, MenuItem } from '../Types/navigation';

export const dashboardMenus: Record<DashboardType, MenuItem[]> = {
  CANDIDATE: [
    { title: 'Dashboard', path: '/dashboard/candidate', iconName: 'dashboard' },
    { title: 'My Applications', path: '/dashboard/candidate/applications', iconName: 'document' },
    { title: 'Find Jobs', path: '/dashboard/candidate/jobs', iconName: 'search' },
    { title: 'My Public Profile', path: '/dashboard/candidate/profile', iconName: 'profile' },
  ],
  ADMIN: [
    { title: 'Dashboard', path: '/dashboard/admin', iconName: 'dashboard' },
    { title: 'Companies', path: '/dashboard/admin/companies', iconName: 'building' },
    { title: 'Candidates', path: '/dashboard/admin/candidates', iconName: 'users' },
  ],
  COMPANY: [
    { title: 'Dashboard', path: '/dashboard/company', iconName: 'dashboard' },
    { title: 'Company Profile', path: '/dashboard/company/profile', iconName: 'building' },
    { title: 'Job Listing', path: '/dashboard/company/joblisting', iconName: 'list' },
  ],
};