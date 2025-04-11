"use client";

import Sidebar from "@/app/components/Sidebar";
import { useState, useEffect } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { styles } from "@/app/styles";
import { DashboardType } from "@/app/Types/navigation";
import { useUserRole } from "@/Lib/client/user";
import Link from "next/link";
import Logo from "../components/Logo";
import store from "../context/store";
import { Provider } from "react-redux";
import Loader from "../components/Loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isLoading } = useUserRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4 lg:hidden bg-white ${styles.borderLight}`}
      >
        <div className="">
          <Link href={"/dashboard/candidate"}>
            <Logo />
          </Link>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          {isSidebarOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <RiMenu3Fill color="currentColor" />
          )}
        </button>
      </div>

      <div className="lg:fixed lg:left-0 lg:top-0 lg:h-full">
        <Sidebar
          userType={role as DashboardType}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <Provider store={store}>
      <main className="flex-1 lg:p-8 mt-16 lg:mt-0 sm:p-1 lg:ml-64">
        {children}
      </main>
      </Provider>
    </div>
  );
}
