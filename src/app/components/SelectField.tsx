import React from "react";

interface SelectFieldProps {
  label: string;
  small: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
  classNameDivContainer?: string;
  classNameLabel?: string;
  classNameDivLgWidth?: string;
  classNameField?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  small,
  id,
  name,
  value,
  onChange,
  options,
  required = false,
  className = "",
  classNameDivContainer = "",
  classNameLabel = "",
  classNameDivLgWidth = "",
  classNameField = "",
}) => {
  return (
    <div className={`${classNameDivContainer}`}>
      <label
        htmlFor={id}
        className={`${classNameLabel}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
        <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <div className={`${classNameDivLgWidth}`}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`${classNameField} ${className}`}
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
