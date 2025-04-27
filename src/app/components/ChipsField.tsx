import { Chips, ChipsChangeEvent } from "primereact/chips";
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

  const handleChange = (e: ChipsChangeEvent) => {
    const newValue = e.value ? e.value : [];
    const lowercasedSet = new Set<string>();
    const uniqueValues: string[] = [];

    for (const item of newValue) {
      const lower = item.toLowerCase();
      if (!lowercasedSet.has(lower)) {
        lowercasedSet.add(lower);
        uniqueValues.push(item);
      }
    }

    onChange(uniqueValues);
  };

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
        onChange={handleChange}
        separator=","
        placeholder={placeholder}
      />
    </div>
  );
};

export default ChipsField;
