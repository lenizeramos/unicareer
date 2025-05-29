"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect, useState, useCallback } from "react";
import { fetchCandidate } from "@/app/context/slices/candidateSlice";
import CandidateForm from "@/app/components/CandidateForm";
import { registerCandidate } from "@/Lib/client/usersService";
import { ICandidate } from "@/app/Types/slices";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { styles } from "@/app/styles";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";

const EditCandidateProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const candidate = useSelector(
    (state: RootState) => state.candidateState.candidate
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCandidate());
  }, [dispatch]);

  const handleCandidateFormSubmit = useCallback(
    async (candidate: ICandidate) => {
      setIsLoading(true);
      try {
        await registerCandidate(candidate);
        router.push("/dashboard/candidate/profile");
      } catch (error) {
        console.error("Error updating the user:", error);
        setIsLoading(false);
      }
    },
    [router]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <DashboardNavbar title="Edit Profile" />
        <Link
          href={"/dashboard/candidate/profile"}
          className="flex justify-end pr-6"
        >
          <IoIosCloseCircleOutline className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-200" />
        </Link>
      </div>

      <div
        className={`${styles.sectionSubText} border-b-[1px] border-gray-300 pb-5 flex justify-center mb-10 w-full`}
      ></div>
      {
        <CandidateForm
          onSubmit={handleCandidateFormSubmit}
          initialData={candidate}
        />
      }
    </>
  );
};

export default EditCandidateProfile;
