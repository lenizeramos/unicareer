import { Chips, ChipsChangeEvent } from "primereact/chips";
import React, {useRef} from "react";
import { IChipsFieldProps } from "../Types/index";

const maxLength = 10;

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
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (uniqueValues.length > maxLength) {
      return;
    }

    onChange(uniqueValues);
  };

  const handleBlur = () => {
    const inputValue = inputRef.current?.value.trim();
    if (inputValue) {
      const updated = [...(value || []), inputValue];
      const lowercasedSet = new Set<string>();
      const uniqueValues: string[] = [];

      for (const item of updated) {
        const lower = item.toLowerCase();
        if (!lowercasedSet.has(lower)) {
          lowercasedSet.add(lower);
          uniqueValues.push(item);
        }
      }

      if (uniqueValues.length <= maxLength) {
        onChange(uniqueValues);
      }
      
    
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
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
          onBlur={handleBlur}
          inputRef={inputRef}
        />
        <div className="bg-blue-200"></div>
      </div>
    </>
  );
};

export default ChipsField;
