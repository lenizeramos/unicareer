import React from "react";

const JobAppliedGraphic: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      <div className="col-span-1">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold">Total Jobs Applied</h2>
          <p className="text-4xl font-bold">45</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Interviewed</h2>
          <p className="text-4xl font-bold">18</p>
        </div>
      </div>

      <div className="col-span-1">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Jobs Applied Status</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-indigo-600"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="60 40"
                  d="M18 2 A16 16 0 1 1 18 34 A16 16 0 1 1 18 2"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">60%</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">60% Unsuitable</p>
          <p className="text-sm text-gray-600">40% Interviewed</p>
          <a href="#" className="text-indigo-600 underline">
            View All Applications
          </a>
        </div>
      </div>

      <div className="col-span-2">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
          <p className="text-gray-500">Today, 26 November</p>
          <div className="mt-4">
            <div className="flex justify-between">
              <span>10:00 AM</span>
              <span>----</span>
            </div>
            <div className="flex justify-between">
              <span>10:30 AM</span>
              <span className="bg-blue-100 rounded-full px-2 py-1 text-indigo-600">
                Joe Bartmann
              </span>
              <span>HR Manager at Divvy</span>
            </div>
            <div className="flex justify-between">
              <span>11:00 AM</span>
              <span>----</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAppliedGraphic;
