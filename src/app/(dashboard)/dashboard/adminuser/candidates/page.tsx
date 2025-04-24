"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { fetchUsers } from "@/app/context/slices/usersSlices";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import FileDisplay from "@/app/components/FileDisplay";
import Loader from "@/app/components/Loader";
import { FaRegEdit } from "react-icons/fa";
import { IUsers } from "@/app/Types/slices";

export default function CandidatesPage() {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers("candidate"));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <DashboardNavbar
        title="Candidates"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Candidates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((candidate: IUsers) => (
            <div
              key={candidate.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <FileDisplay
                    modelName="userProfileImage"
                    userId={candidate.userId || ""}
                    width={60}
                    height={60}
                    className="rounded-full overflow-hidden"
                    fallbackImage={candidate.photo || ""}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {candidate.firstName} {candidate.lastName}
                  </h2>
                  <p className="text-gray-600">{candidate.email}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaRegEdit size={16} />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
