"use client";
import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "@/app/components/ButtonComp";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { styles } from "@/app/styles";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePlace } from "react-icons/md";
import { jobsCategories, jobsTypes, salaryRange } from "@/app/constants";
import FilterJobs from "@/app/components/FilterJobs";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import { AppDispatch, RootState } from "@/app/context/store";
import { IJobsState } from "@/app/Types/slices";
import { useEffect, useState } from "react";
import { fetchAllJobs } from "@/app/context/slices/jobSlices";

export default function FindJobs() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    searchLocation: "",
    jobType: "",
    category: "",
    salary: "",
  });
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };
  const dispatch: AppDispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.jobs as IJobsState);
  let jobsArray: string[] = [];
  jobsCategories.map((category) => {
    return jobsArray.push(category.title);
  });
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [dispatch, jobs.length]);
  console.log(filters);
  return (
    <>
      <DashboardNavbar
        title="Find Jobs"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="p-5">
        <div
          className={`${styles.sectionSubText} border-y-[1px] border-gray-300 py-10 flex justify-center mb-5`}
        >
          <div className="flex justify-center gap-10 items-center border border-gray-200 px-5 py-8 w-fit">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <CiSearch className="text-gray-400" size={30} />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className={`${styles.sectionSubText} px-2 w-90 outline-none border-b border-gray-200`}
                />
              </div>
            </div>
            <div className="w-[0.2px] h-10 bg-gray-300" />
            <div className="flex flex-col">
              <div className="flex gap-2">
                <MdOutlinePlace className="text-gray-300" size={30} />
                <input
                  type="text"
                  placeholder="Vancouver, Canada"
                  className={`${styles.sectionSubText} px-2 w-90 outline-none border-b border-gray-200`}
                />
              </div>
            </div>
            <ButtonComp text="Search" IsWhite={false} />
          </div>
        </div>
        <div className="flex gap-20">
          <div className="flex flex-col gap-4">
            <FilterJobs
              array={jobsTypes}
              title="Type of Employment"
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <FilterJobs
              array={jobsArray}
              title="Categories"
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <FilterJobs
              array={salaryRange}
              title="Salary Range"
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="w-full">
            <h2 className={`${styles.sectionHeadText} font-semibold`}>
              All Jobs
            </h2>
            <p className={`${styles.sectionSubText} text-gray-500`}>
              Showing 73 results
            </p>
            <CardsContainer cardId="allJobs" params={jobs} />
          </div>
        </div>
      </div>
    </>
  );
}
