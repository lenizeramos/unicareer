import { DashboardType, MenuItem } from '../Types/navigation';

export const dashboardMenus: Record<DashboardType, MenuItem[]> = {
  candidate: [
    { title: 'Dashboard', path: '/dashboard/candidate', iconName: 'dashboard' },
    { title: 'My Applications', path: '/dashboard/candidate/applications', iconName: 'document' },
    { title: 'Find Jobs', path: '/dashboard/candidate/jobs', iconName: 'search' },
    { title: 'My Public Profile', path: '/dashboard/candidate/profile', iconName: 'profile' },
  ],
  admin: [
    { title: 'Dashboard', path: '/dashboard/adminuser', iconName: 'dashboard' },
    { title: 'Companies', path: '/dashboard/adminuser/companies', iconName: 'building' },
    { title: 'Candidates', path: '/dashboard/adminuser/candidates', iconName: 'users' },
  ],
  company: [
    { title: 'Dashboard', path: '/dashboard/company', iconName: 'dashboard' },
    { title: 'Company Profile', path: '/dashboard/company/profile', iconName: 'building' },
    { title: 'Job Listing', path: '/dashboard/company/joblisting', iconName: 'list' },
    { title: 'Payments', path: '/dashboard/company/payments', iconName: 'dollar' },
  ],
};