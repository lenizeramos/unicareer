import React from "react";
import InputField from "./InputField";
import { classNameLabel, classNameField } from "@/app/constants";
import { IoMdAdd, IoMdTrash } from "react-icons/io";

interface EducationProps {
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    country: string;
    startDate: Date;
    endDate?: Date | null;
    current: boolean;
    description?: string;
  }>;
  onChange: (education: any[]) => void;
}

const EducationSection: React.FC<EducationProps> = ({
  education,
  onChange,
}) => {
  const handleAdd = () => {
    onChange([
      ...education,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        country: "",
        startDate: new Date(),
        current: false,
        description: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange(newEducation);
  };

  const formatDateForInput = (date: Date | string | null | undefined) => {
    if (!date) return "";
    if (typeof date === "string") {
      if (date === "Present") return "";
      return date.split("T")[0];
    }
    return date instanceof Date ? date.toISOString().split("T")[0] : "";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={classNameLabel}>Education</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <IoMdAdd className="mr-1" /> Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div
          key={index}
          className="p-4 border border-gray-300 rounded-lg space-y-4 relative"
        >
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            <IoMdTrash />
          </button>

          <InputField
            label="Institution"
            id={`institution-${index}`}
            value={edu.institution}
            onChange={(e) => handleChange(index, "institution", e.target.value)}
            required
            classNameLabel={classNameLabel}
            classNameField={classNameField}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Degree"
              id={`degree-${index}`}
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              required
              classNameLabel={classNameLabel}
              classNameField={classNameField}
            />

            <InputField
              label="Field of Study"
              id={`fieldOfStudy-${index}`}
              value={edu.fieldOfStudy}
              onChange={(e) =>
                handleChange(index, "fieldOfStudy", e.target.value)
              }
              required
              classNameLabel={classNameLabel}
              classNameField={classNameField}
            />
          </div>

          <InputField
            label="Country"
            id={`country-${index}`}
            value={edu.country}
            onChange={(e) => handleChange(index, "country", e.target.value)}
            required
            classNameLabel={classNameLabel}
            classNameField={classNameField}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Start Date"
              id={`startDate-${index}`}
              type="date"
              value={formatDateForInput(edu.startDate)}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
              required
              classNameLabel={classNameLabel}
              classNameField={classNameField}
            />

            {!edu.current && (
              <InputField
                label="End Date"
                id={`endDate-${index}`}
                type="date"
                value={formatDateForInput(edu.endDate)}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                classNameLabel={classNameLabel}
                classNameField={classNameField}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${index}`}
              checked={edu.current}
              onChange={(e) => {
                handleChange(index, "current", e.target.checked);
                if (e.target.checked) {
                  handleChange(index, "endDate", null);
                }
              }}
            />
            <label htmlFor={`current-${index}`}>Current</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
