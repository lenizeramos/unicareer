"use client"

import { dashboardMenus } from '@/app/config/navigation';
import Sidebar from '@/app/components/Sidebar';
import { useState } from 'react';
import { RiMenu3Fill } from "react-icons/ri";
import { styles } from '@/app/styles';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userType = "company"; // TODO: get user type from clerk session (candidate, company, admin)

    return (
        <div className="flex min-h-screen">
            {/* Mobile Header */}
            <div className={`fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4 lg:hidden bg-white ${styles.borderLight}`}>
                <div className="flex items-center gap-2">
                    <img src="/img/logo.svg" alt="UniCareer logo" className="w-8 h-8" />
                    <span className="text-xl font-bold">UniCareer</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2"
                >
                    {isSidebarOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>  
                    ) : (
                        <RiMenu3Fill color="currentColor" />
                    )}
                </button>
            </div>

            {/* Sidebar - Added fixed positioning for lg screens */}
            <div className="lg:fixed lg:left-0 lg:top-0 lg:h-full">
                <Sidebar 
                    userType={userType} 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} 
                />
            </div>
            
            {/* Main Content - Added margin-left for lg screens to account for fixed sidebar */}
            <main className="flex-1 lg:p-8 mt-16 lg:mt-0 sm:p-1 lg:ml-64">
                {children}
            </main>
        </div>
    );
}