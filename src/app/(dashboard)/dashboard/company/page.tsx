import React from "react";
import { SlArrowRight } from "react-icons/sl";
import StatusCard from "@/app/components/Cards/StatusCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="New candidates to review"
            value={76}
            icon={<SlArrowRight />}
            color="text-white"
            backgroundColor="bg-blue-400"
          />
          <StatusCard
            title="Schedule for today"
            value={3}
            icon={<SlArrowRight />}
            color="text-white"
            backgroundColor="bg-green-400"
          />
          <StatusCard
            title="Messages received"
            value={24}
            icon={<SlArrowRight />}
            color="text-white"
            backgroundColor="bg-purple-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
