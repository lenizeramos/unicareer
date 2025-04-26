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

const EditCandidateProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const candidate = useSelector((state: RootState) => state.candidateState.candidate);
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
      {<CandidateForm onSubmit={handleCandidateFormSubmit} initialData={candidate} />}
    </>
  );
};

export default EditCandidateProfile;
