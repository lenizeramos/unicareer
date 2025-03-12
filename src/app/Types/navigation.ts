export interface MenuItem {
    title: string;
    path: string;
    iconName?: string;
}

export interface SidebarProps {
    userType: DashboardType;
    isOpen?: boolean;
    onClose?: () => void;
    menuItems?: MenuItem[];
}

export type DashboardType = 'CANDIDATE' | 'ADMIN' | 'COMPANY';