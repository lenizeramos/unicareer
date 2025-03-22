import React from "react";

interface InputFieldProps {
  label: string;
  small?: string;
  id: string;
  name: string;
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
  classNameDivContainer?: string;
  classNameLabel?: string;
  classNameDivLgWidth?: string;
  classNameField?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  small,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
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
      <label
        htmlFor={id}
        className={`${classNameLabel}`}
      >
        {label} {required && <span className="text-red-500">*</span>}{" "}
        <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <div className={`${classNameDivLgWidth}`}>
        <input
          type={type}
          id={id}
          name={name}
          value={value !== null ? value : ""}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${classNameField} ${className}`}
        />
      </div>
    </div>
  );
};

export default InputField;
