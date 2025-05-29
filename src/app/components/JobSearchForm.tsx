"use client";

import { CiSearch } from "react-icons/ci";
import ButtonComp from "./ButtonComp";
import { styles } from "../styles";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";

const JobSearchForm = ({
  onFilterChange,
}: {
  onFilterChange?: (key: string, value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleChange = (
    type: "searchTerm" | "searchLocation",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (type === "searchTerm") {
      setSearchTerm(event.target.value);
    } else if (type === "searchLocation") {
      setSearchLocation(event.target.value);
    }
  };
  const handleSearchClick = () => {
    if (onFilterChange) {
      onFilterChange("searchTerm", searchTerm);
      onFilterChange("searchLocation", searchLocation);
    }
    setSearchTerm("");
    setSearchLocation("");
  };
  return (
    <div className="flex flex-col sm:flex-row p-4 rounded-xl bg-gray-200 gap-y-5 justify-center items-center sm:max-w-[800px] max-w-[300px] sm:gap-3 sm:mx-0 mx-auto z-100">
      <div className="w-fit flex gap-2 border-b sm:border-x border-gray-300 rounded-xl items-center">
        <CiSearch className="text-gray-400" size={25} />
        <input
          className={`${styles.sectionSubText} outline-none text-gray-500 sm:py-1`}
          type="text"
          name="searchInput"
          placeholder="Job title or keyword"
          value={searchTerm}
          onChange={(e) => handleChange("searchTerm", e)}
        />
      </div>

      <div className="w-fit flex gap-2 border-b sm:border-x border-gray-300 rounded-xl items-center">
        <CiLocationOn className="text-gray-400" size={25} />
        <input
          type="text"
          name="locationInput"
          value={searchLocation}
          placeholder="Vancouver, Canada"
          className={`${styles.sectionSubText} outline-none text-gray-500 sm:py-1`}
          onChange={(e) => handleChange("searchLocation", e)}
        />
      </div>

      <ButtonComp
        text="Search job"
        IsWhite={false}
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default JobSearchForm;
