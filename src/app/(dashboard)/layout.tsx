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

    return (
        <div className="flex min-h-screen">
            {/* Mobile Header */}
            <div className={`lg:hidden fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4 ${styles.borderLight}`}>
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

            {/* Sidebar */}
            <Sidebar 
                userType="candidate" 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
            
            {/* Main Content */}
            <main className="flex-1 p-8 mt-16 lg:mt-0">
                {children}
            </main>
        </div>
    );
}