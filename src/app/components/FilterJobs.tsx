"use client";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IFilterJobs } from "../Types";
import { useState } from "react";

const FilterJobs = ({ array, title, filters, onFilterChange }: IFilterJobs) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [checkedId, setCheckedId] = useState<string | null>(null);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedId(event.target.id);
    } else {
      setCheckedId(null);
    }
    onFilterChange("", event.target.value);
  };
  return (
    <>
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center w-60">
            <h3 className="font-semibold">{title}</h3>
            {isVisible ? (
              <IoIosArrowUp className="cursor-pointer" onClick={handleClick} />
            ) : (
              <IoIosArrowDown
                className="cursor-pointer"
                onClick={handleClick}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            {isVisible && (
              <div className="flex flex-col gap-2">
                {array.map((item, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      value={item}
                      id={`${title}_${index}`}
                      checked={checkedId === `${title}_${index}`}
                      onChange={handleChange}
                    />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterJobs;
