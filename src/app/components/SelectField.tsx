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
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>} <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
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
  );
};

export default SelectField;
