import React from "react";
import { ISelectFieldProps } from "@/app/Types/index";

const SelectField: React.FC<ISelectFieldProps> = ({
  label,
  small,
  id,
  name,
  value,
  onChange,
  options,
  required,
  className = "",
  classNameDivContainer = "",
  classNameLabel = "",
  classNameDivLgWidth = "",
  classNameField = "",
}) => {
  return (
    <div className={`${classNameDivContainer}`}>
      <label htmlFor={id} className={`${classNameLabel}`}>
        {label} {required && <span className="text-red-500">*</span>}
        {small && (
          <small className="block text-xs text-gray-500">{small}</small>
        )}
      </label>
      <div className={`${classNameDivLgWidth}`}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`${classNameField} ${className}`}
          required={required}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
