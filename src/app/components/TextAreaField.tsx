import React from "react";

interface TextAreaFieldProps {
  label: string;
  small: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
  classNameDivContainer?: string;
  classNameLabel?: string;
  classNameDivLgWidth?: string;
  classNameField?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  small,
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  rows = 4,
  className = "",
  classNameDivContainer = "",
  classNameLabel = "",
  classNameDivLgWidth = "",
  classNameField = "",
}) => {
  return (
    <div className={`${classNameDivContainer}`}>
      <label htmlFor={id} className={`${classNameLabel}`}>
        {label} {required && <span className="text-red-500">*</span>} <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <div className={`${classNameDivLgWidth}`}><textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`${classNameField} ${className}`}
      />
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1 text-right">
          {value.length}/{maxLength}
        </p>
      )}</div>
      
    </div>
  );
};

export default TextAreaField;
