"use client";
import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "@/app/components/ButtonComp";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { styles } from "@/app/styles";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePlace } from "react-icons/md";
import { filtersValues } from "@/app/constants";
import FilterJobs from "@/app/components/FilterJobs";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import { AppDispatch, RootState } from "@/app/context/store";
import { IJobsState } from "@/app/Types/slices";
import { useEffect, useState } from "react";
import { fetchAllJobs } from "@/app/context/slices/jobSlices";
import SearchNotFound from "@/app/components/SearchNotFound";
import Loader from "@/app/components/Loader";
import { AiOutlineAlignCenter } from "react-icons/ai";
import Modal from "@/app/components/Modal";
import { TbZoomReset } from "react-icons/tb";

export default function FindJobs() {
  const [isModalOpen, setModalOpen] = useState(false);
  //Jobs
  const dispatch: AppDispatch = useDispatch();
  const { jobs, loading } = useSelector(
    (state: RootState) => state.jobs as IJobsState
  );

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [jobs.length, dispatch]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    searchLocation: "",
    jobType: "",
    category: "",
    jobLevel: "",
    salary: { min: 0, max: 0 },
  });

  const getValue = (value: string | number) => {
    if (typeof value === "string") {
      return parseFloat(value);
    } else {
      return value;
    }
  };
  const jobsWithStatus = jobs.filter(
    (job) => new Date(job.closingDate) > new Date()
  );
  const filtersJobs = jobsWithStatus.filter((job) => {
    const matchesSearchTerm = job.location
      .toLowerCase()
      .includes(filters.searchLocation.toLowerCase());
    const matchesLocation = job.title
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesJobType = filters.jobType
      ? job.type.toLowerCase() === filters.jobType.toLowerCase()
      : true;
    const matchesCategory = filters.category
      ? job.categories === filters.category.toLowerCase()
      : true;
    const matchesSalary = getValue(filters.salary.max)
      ? job.salaryMax >= getValue(filters.salary.min) &&
        job.salaryMax <= getValue(filters.salary.max)
      : true;
    const matchesJobLevel = filters.jobLevel
      ? job.level.toLowerCase() === filters.jobLevel.toLowerCase()
      : true;

    return (
      matchesSearchTerm &&
      matchesLocation &&
      matchesJobType &&
      matchesCategory &&
      matchesSalary &&
      matchesJobLevel
    );
  });
  const handleFilterChange = (
    key: string,
    value: string | { min: number; max: number }
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleFilterChangeSelect = (
    key: string,
    value: string | { min: number; max: number }
  ) => {
   
    if (key === "salary" && typeof value === "number") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        salary: { min: value - 10, max: value },
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    }
  };

  const handleOnClickModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DashboardNavbar
        title="Find Jobs"
        button={{ text: "Back to dashboard", IsWhite: true }}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="p-5 w-full">
          <div
            className={`${styles.sectionSubText} border-y-[1px] border-gray-300 py-10 flex justify-center mb-5 w-full`}
          >
            <div className="flex md:flex-row flex-col justify-center gap-10 items-center border border-gray-200 px-5 py-8 w-full">
              <div className="flex flex-col w-full">
                <div className="flex gap-2 w-full">
                  <CiSearch className="text-gray-400" size={30} />
                  <input
                    type="text"
                    value={filters.searchTerm}
                    name="searchInput"
                    placeholder="Job title or keyword"
                    className={`${styles.sectionSubText} px-2 w-full outline-none border-b border-gray-200`}
                    onChange={(e) =>
                      handleFilterChange("searchTerm", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="w-[0.2px] h-10 bg-gray-300 hidden lg:block" />
              <div className="flex flex-col w-full">
                <div className="flex gap-2 w-full">
                  <MdOutlinePlace className="text-gray-300" size={30} />
                  <input
                    type="text"
                    name="locationInput"
                    value={filters.searchLocation}
                    placeholder="Vancouver, Canada"
                    className={`${styles.sectionSubText} px-2  w-full outline-none border-b border-gray-200`}
                    onChange={(e) =>
                      handleFilterChange("searchLocation", e.target.value)
                    }
                  />
                </div>
              </div>
              <ButtonComp text="Search" IsWhite={false} isDissable={true} />
            </div>
          </div>

          <div className="flex md:flex-row flex-col lg:gap-20 gap-5 md:items-start items-center">
            <div className="gap-10 md:hidden flex border-b border-gray-300 w-full items-center justify-center pb-4">
              <button
                className="cursor-pointer font-shafarik flex gap-4"
                onClick={() => setModalOpen(true)}
              >
                <AiOutlineAlignCenter size={30} className="rotate-180" /> More
                Filters
              </button>
              <button
                onClick={() => {
                  setFilters({
                    searchTerm: "",
                    searchLocation: "",
                    jobType: "",
                    category: "",
                    jobLevel: "",
                    salary: { min: 0, max: 0 },
                  });
                }}
                className="font-shafarik cursor-pointer flex gap-4"
              >
                <TbZoomReset size={30} /> Reset Filters
              </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
              <h2 className="text-2xl font-semibold mb-4 font-monomakh text-center">
                Filter Section
              </h2>
              <p className="text-gray-700 font-shafarik pb-3">
                Choose filters to help you discover your ideal job.
              </p>
              <div className="grid grid-cols-2 gap-5 justify-center">
                {filtersValues.map((filter, index) => {
                  return (
                    <div className="font-shafarik p-2" key={index}>
                      <label
                        htmlFor={filter.type}
                        className="font-semibold ml-2"
                      >
                        {filter.title}
                      </label>
                      <div className="mt-1">
                        <select
                          name={filter.type}
                          id={filter.type}
                          onChange={(e) =>
                            handleFilterChangeSelect(
                              `${filter.type}`,
                              e.target.value
                            )
                          }
                          className="border border-gray-200 rounded-xl p-1"
                        >
                          <option value=" ">Select an option</option>
                          {filter.type === "salary"
                            ? (
                                filter.array as { min: number; max: number }[]
                              ).map((option, index) => (
                                <option
                                  key={index}
                                  value={option.max}
                                >
                                  {option.min} - {option.max}
                                </option>
                              ))
                            : filter.array &&
                              filter.array.map((option, index) => (
                                <option key={index} value={option.toString()}>
                                  {option.toString()}
                                </option>
                              ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center mt-5">
                <ButtonComp
                  IsWhite={false}
                  onClick={handleOnClickModal}
                  text="Search"
                  width="w-50"
                />
              </div>
            </Modal>

            <div className="md:flex md:flex-col gap-4 hidden">
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
              <p className={`${styles.sectionSubText} text-gray-500 pb-2`}>
                Showing {filtersJobs.length} results
              </p>
              {filtersJobs.length > 0 ? (
                <CardsContainer cardId="allJobs" params={filtersJobs} />
              ) : (
                <SearchNotFound text="No matching jobs found." />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
