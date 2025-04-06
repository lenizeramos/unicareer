"use client";
import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "@/app/components/ButtonComp";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { styles } from "@/app/styles";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePlace } from "react-icons/md";
import {
  jobsTypes,
  salaryRange,
  categories,
  filtersValues,
} from "@/app/constants";
import FilterJobs from "@/app/components/FilterJobs";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import { AppDispatch, RootState } from "@/app/context/store";
import { IJobsState } from "@/app/Types/slices";
import { useEffect, useState } from "react";
import { fetchAllJobs } from "@/app/context/slices/jobSlices";

export default function FindJobs() {
  //Jobs
  const dispatch: AppDispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.jobs as IJobsState);
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [dispatch, jobs.length]);
  //Filters
  const [filters, setFilters] = useState({
    searchTerm: "",
    searchLocation: "",
    jobType: "",
    category: "",
    jobLevel: "",
    salary: 0,
  });

  const filtersJobs = jobs.filter((job) => {
    const matchesSearchTerm = job.title
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesJobType = filters.jobType
      ? job.type === filters.jobType
      : true;
    const matchesCategory = filters.category
      ? job.categories === filters.category
      : true;
    const matchesSalary = filters.salary
      ? job.salaryMax === filters.salary
      : true;
    const matchesJobLevel = filters.jobLevel
      ? job.level === filters.jobLevel
      : true;

    return (
      matchesSearchTerm &&
      matchesJobType &&
      matchesCategory &&
      // matchesSalary &&
      matchesJobLevel
    );
  });
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };
  console.log("filters=>", filters);
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
                  name="searchInput"
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
                  name="locationInput"
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
            {filtersValues.map((filter, index) => {
              return (
                <FilterJobs
                  key={index}
                  array={filter.array}
                  title={filter.title}
                  type={filter.type}
                  onFilterChange={handleFilterChange}
                />
              );
            })}
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
