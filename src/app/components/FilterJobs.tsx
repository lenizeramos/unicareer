"use client";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IFilterJobs } from "../Types";
import { useState } from "react";
import { salaryRange } from "../constants";

const FilterJobs = ({ array, title, type, onFilterChange }: IFilterJobs) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [checkedId, setCheckedId] = useState<string>("");
  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onFilterChange) {
      const { checked, value, id, dataset } = event.target;
      if (checked) {
        const min = dataset.min ? parseInt(dataset.min, 10) : 0;
        const max = dataset.max ? parseInt(dataset.max, 10) : 0;

        if (type === "salary") {
          onFilterChange(type, { min, max });
        } else {
          onFilterChange(type, value);
        }

        setCheckedId(id);
      } else {
        setCheckedId("");
        if (type === "salary") {
          onFilterChange(type, { min: 0, max: 0 });
        } else {
          onFilterChange(type, "");
        }
      }
    }
  };

  return (
    <>
        <div className="flex flex-col gap-3 font-shafarik">
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
                {array === salaryRange
                  ? array.map((item, index) => {
                      return (
                        <div className="flex gap-2" key={index}>
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            name={title}
                            value={`${item.min}-${item.max}`}
                            data-min={item.min}
                            data-max={item.max}
                            id={`${title}_${index}`}
                            checked={checkedId === `${title}_${index}`}
                            onChange={handleChange}
                          />
                          <p>
                            ${item.min} - ${item.max}
                          </p>
                        </div>
                      );
                    })
                  : array.map((item, index) => {
                      return (
                        <div className="flex gap-2" key={index}>
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            name={title}
                            value={item.toString()}
                            id={`${title}_${index}`}
                            checked={checkedId === `${title}_${index}`}
                            onChange={handleChange}
                          />
                          <p>{item.toString()}</p>
                        </div>
                      );
                    })}
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default FilterJobs;
