"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect, useState, useCallback } from "react";
import { fetchCompany } from "@/app/context/slices/companySlice";
import CompanyForm from "@/app/components/CompanyForm";
import { registerCompany } from "@/Lib/client/usersService";
import { ICompany } from "@/app/Types/slices";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";
import CompanyHeader from "@/app/components/CompanyHeader";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";

const EditCompanyProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector((state: RootState) => state.companyState.company);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  const handleCompanyFormSubmit = useCallback(
    async (company: ICompany) => {
      setIsLoading(true);
      try {
        await registerCompany(company);
        router.push("/dashboard/company/profile");
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
        <CompanyHeader
          image="/img/img.png"
          name="Edit Profile"
          isDashboard={false}
        />
        <Link
          href={"/dashboard/company/profile"}
          className="flex justify-end pr-6"
        >
          <IoIosCloseCircleOutline className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-200" />
        </Link>
      </div>

      <CompanyForm onSubmit={handleCompanyFormSubmit} initialData={company} />
    </>
  );
};

export default EditCompanyProfile;
