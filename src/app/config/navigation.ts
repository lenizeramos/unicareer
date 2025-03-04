import { DashboardType, MenuItem } from '../Types/navigation';

export const dashboardMenus: Record<DashboardType, MenuItem[]> = {
  candidate: [
    { title: 'Dashboard', path: '/candidate', iconName: 'Dashboard' },
    { title: 'My Applications', path: '/candidate/applications', iconName: 'Applications' },
    { title: 'Find Jobs', path: '/candidate/jobs', iconName: 'Search' },
    { title: 'My Public Profile', path: '/candidate/profile', iconName: 'Profile' },
  ],
  admin: [
    { title: 'Dashboard', path: '/admin', iconName: 'Dashboard' },
    { title: 'Companies', path: '/admin/companies', iconName: 'Companies' },
    { title: 'Candidates', path: '/admin/candidates', iconName: 'Candidates' },
  ],
  company: [
    { title: 'Dashboard', path: '/company', iconName: 'Dashboard' },
    { title: 'Company Profile', path: '/company/profile', iconName: 'Profile' },
    { title: 'Job Listing', path: '/company/jobs', iconName: 'JobListing' },
  ],
};