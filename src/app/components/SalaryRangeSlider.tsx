import React, { useState } from "react";
import { Range } from "react-range";
import {ISalaryRangeSliderProps} from "@/app/Types/index"

const SalaryRangeSlider: React.FC<ISalaryRangeSliderProps> = ({
  label,
  small,
  id,
  min,
  max,
  step,
  initialValues,
  onChange,
  required = false,
  classNameDivContainer = "",
  classNameLabel = "",
  
}) => {
  const [values, setValues] = useState<number[]>(initialValues);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <div className={`${classNameDivContainer}`}>
      <label htmlFor={id} className={`${classNameLabel}`}>
        {label} {required && <span className="text-red-500">*</span>}
        <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <div className={`lg:w-2/5 mt-10`}>
        <Range
          step={step}
          min={min}
          max={max}
          values={values}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="range-track"
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...restProps } = props; 
            return (
              <div
                key={key} 
                {...restProps} 
                className="range-thumb"
              />
            );
          }}
        />
        <div className="flex justify-between mt-2">
          <span>${values[0]}</span>
          <span>${values[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryRangeSlider;
