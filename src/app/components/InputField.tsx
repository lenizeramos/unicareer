import React from "react";

interface InputFieldProps {
  label: string;
  small?: string
  id: string;
  name: string;
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
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
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>} <small className="block text-xs text-gray-500">{small}</small>
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value !== null ? value : ""}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      />
    </div>
  );
};

export default InputField;
