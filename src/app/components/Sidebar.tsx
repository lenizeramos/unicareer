"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardType, SidebarProps } from '../Types/navigation';
import { styles } from '../styles';
import Icon from './Icon';
import { dashboardMenus } from '../config/navigation';
import React, { useEffect } from 'react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaRegBuilding } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import Image from 'next/image';
import { useUser, useClerk } from "@clerk/nextjs";
import { CiLogout } from "react-icons/ci";
import Logo from "./Logo";
import { useState } from "react";
import FileDisplay from './FileDisplay';

const iconComponents = {
    dashboard: MdOutlineSpaceDashboard,
    document: TiDocumentText,
    search: IoSearchSharp,
    profile: CgProfile,
    building: FaRegBuilding,
    users: FiUsers,
    list: CiViewList,
    dollar: CiDollar,
};

export default function Sidebar({ userType, isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname();
    const menuItems = dashboardMenus[userType as DashboardType];
    const { user } = useUser();
    const { signOut } = useClerk();

    const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const getUserId = async () => {        
        try {
            const response = await fetch('/api/user/get-user-by-clerk-id', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setUserId(data.id);
        } catch (error) {
            console.error('Failed to fetch user ID:', error);
        }
    };
    getUserId();
  }, []);

    const handleSignOut = () => {
        signOut();
    };

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            
            <div className={`
                fixed top-0 left-0 bg-lightBackground z-50 pt-6
                transition-transform duration-300 ease-in-out
                w-64 h-screen
                lg:translate-x-0 lg:static
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex justify-center items-center mb-8">
                    <Logo />
                </div>
                <nav>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <div className={`${
                                    pathname === item.path ? styles.menuItemFocusLine : ''
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
                                                    className={`text-2xl ${styles.menuHover} ${
                                                        pathname === item.path ? 'text-primary' : ''
                                                    }`}
                                                />;
                                            })()
                                        }
                                        <span className={`${
                                            pathname === item.path ? 'text-primary' : ''
                                        }`}>{item.title}</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                        <li>
                            <div className="w-full pl-6">
                                <button 
                                    onClick={handleSignOut} 
                                    className={`block pt-2 pb-2 pl-2 w-full ${styles.menuHover} ${styles.menuItem} transition-colors flex items-center gap-2 cursor-pointer`}
                                >
                                    <CiLogout className="text-2xl" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div className="flex items-center justify-center mt-auto absolute bottom-0 p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FileDisplay
                                    modelName={userType === 'candidate' ? 'userProfileImage' : 'companyProfileImage'}
                                    userId={userId}
                                    width={60}
                                    height={60}
                                    className="rounded-full overflow-hidden"
                                    fallbackImage={user?.imageUrl || ''}
                                />           
                            </div>
                            <div>
                                <p className="text-md font-bold">{user?.firstName} {user?.lastName}</p>
                                <p className="text-sm text-not-focus-color">{user?.emailAddresses[0].emailAddress}</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}