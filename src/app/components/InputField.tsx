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
  required,
  maxLength,
  className = "",
  classNameDivContainer = "",
  classNameLabel = "",
  classNameDivLgWidth = "",
  classNameField = "",
  accept,
  fileLabel,
  filePreview,
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
        {type === "file" ? (
          <div className="flex items-center space-x-4">
            <label className="flex flex-col items-center justify-center w-full px-4 py-6 text-sm text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              {filePreview}
              <span className="mt-2">{fileLabel}</span>
              <input
                type={type}
                id={id}
                name={name}
                onChange={onChange}
                className="hidden"
                accept={accept}
                required={required}
              />
            </label>
          </div>
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            value={value !== null ? value : ""}
            onChange={onChange}
            min={minDate}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`${classNameField} ${className}`}
            required={required}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
