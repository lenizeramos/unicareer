import React from "react";
import { InputFieldProps } from "@/app/Types/index";

const InputField: React.FC<InputFieldProps> = ({
  label,
  small,
  id,
  name,
  value,
  onChange,
  minDate,
  placeholder,
  type,
  required = false,
  maxLength,
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
        <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <div className={`${classNameDivLgWidth}`}>
        <input
          type={type}
          id={id}
          name={name}
          value={value !== null ? value: ""}
          onChange={onChange}
          min={minDate}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${classNameField} ${className}`}
        />
      </div>
    </div>
  );
};

export default InputField;
