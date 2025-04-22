import { Chips } from "primereact/chips";
import React from "react";
import { IChipsFieldProps } from "../Types/index";

const ChipsField: React.FC<IChipsFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  itemTemplate,
  className,
  labelClass,
  containerClass,
  helperText,
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={label.toLowerCase()} className={labelClass}>
        {label}
        {helperText && (
          <small className="block text-xs text-gray-500">{helperText}</small>
        )}
      </label>
      <Chips
        className={className}
        itemTemplate={itemTemplate}
        value={value}
        onChange={(e) => onChange(e.value ? e.value : [])}
        separator=","
        placeholder={placeholder}
      />
    </div>
  );
};

export default ChipsField;
