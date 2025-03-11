export interface MenuItem {
    title: string;
    path: string;
    iconName?: string;
}

export interface SidebarProps {
    userType: DashboardType;
    isOpen?: boolean;
    onClose?: () => void;
}

export type DashboardType = 'candidate' | 'admin' | 'company';