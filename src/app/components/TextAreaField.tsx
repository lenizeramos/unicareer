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
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>} <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      />
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
