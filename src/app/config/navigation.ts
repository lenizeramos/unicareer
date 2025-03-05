import { DashboardType, MenuItem } from '../Types/navigation';

export const dashboardMenus: Record<DashboardType, MenuItem[]> = {
  candidate: [
    { title: 'Dashboard', path: '/candidate', iconName: 'dashboard' },
    { title: 'My Applications', path: '/candidate/applications', iconName: 'document' },
    { title: 'Find Jobs', path: '/candidate/jobs', iconName: 'search' },
    { title: 'My Public Profile', path: '/candidate/profile', iconName: 'profile' },
  ],
  admin: [
    { title: 'Dashboard', path: '/admin', iconName: 'dashboard' },
    { title: 'Companies', path: '/admin/companies', iconName: 'building' },
    { title: 'Candidates', path: '/admin/candidates', iconName: 'users' },
  ],
  company: [
    { title: 'Dashboard', path: '/company', iconName: 'dashboard' },
    { title: 'Company Profile', path: '/company/profile', iconName: 'building' },
    { title: 'Job Listing', path: '/company/jobs', iconName: 'list' },
  ],
};