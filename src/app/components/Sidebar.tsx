"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardType, SidebarProps } from '../Types/navigation';
import { styles } from '../styles';
import Icon from './Icon';
import { dashboardMenus } from '../config/navigation';
import React from 'react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaRegBuilding } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";

const iconComponents = {
    dashboard: MdOutlineSpaceDashboard,
    document: TiDocumentText,
    search: IoSearchSharp,
    profile: CgProfile,
    building: FaRegBuilding,
    users: FiUsers,
    list: CiViewList,
};

export default function Sidebar({ userType, isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname();
    const menuItems = dashboardMenus[userType as DashboardType];

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            
            <div className={`
                fixed top-0 left-0 h-full bg-white z-50 pt-6
                transition-transform duration-300 ease-in-out
                w-64 
                lg:translate-x-0 lg:static
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 text-black pl-4 h-16 lg:h-auto">
                    <Icon src="/img/logo.svg" alt="UniCareer logo" className="w-8 h-8 lg:block" />
                    <span className="lg:block">UniCareer</span>
                </h1>
                <nav>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <div className={`${
                                    pathname === item.path ? styles.menuItemFocusLine : styles.menuItemNoFocusLine
                                }`}>
                                    <Link 
                                        href={item.path}
                                        className={`block p-2 ml-6 ${styles.menuHover} ${styles.menuItem} transition-colors ${
                                            pathname === item.path ? styles.menuItemFocus : ''
                                        } flex items-center gap-2 hover-icon-parent`}
                                    >
                                        {(typeof item.iconName === 'string' && item.iconName in iconComponents) && 
                                            (() => {
                                                const IconComponent = iconComponents[item.iconName as keyof typeof iconComponents];
                                                return <IconComponent 
                                                    className={`text-2xl ${styles.menuHover}`}
                                                />;
                                            })()
                                        }
                                        <span>{item.title}</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}