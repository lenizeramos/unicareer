import React from "react";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { classNameLabel, classNameField } from "@/app/constants";
import { IoMdAdd, IoMdTrash } from "react-icons/io";

interface WorkExperience {
  company: string;
  position: string;
  country: string;
  startDate?: Date;
  endDate?: Date | null;
  current: boolean;
  description?: string;
}

interface WorkExperienceProps {
  experience: WorkExperience[];
  onChange: (experience: WorkExperience[]) => void;
}

const WorkExperienceSection: React.FC<WorkExperienceProps> = ({
  experience,
  onChange,
}) => {
  const handleAdd = () => {
    onChange([
      ...experience,
      {
        company: "",
        position: "",
        country: "",
        current: false,
        description: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof WorkExperience,
    value: WorkExperience[keyof WorkExperience]
  ) => {

    if ((field === "startDate") || (field === "endDate")) {
      value = value && new Date(value.toString()).toISOString()
    }

    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange(newExperience);
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
        <h3 className={classNameLabel + " text-[20px] font-shafarik"}>Work Experience</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center text-blue-600 hover:text-blue-800 font-shafarik"
        >
          <IoMdAdd className="mr-1" /> Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
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

          <div className="grid xs:grid-cols-2 gap-4">
            <InputField
              label="Company"
              id={`company-${index}`}
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              required
              classNameLabel={classNameLabel + " text-lg font-shafarik"}
              classNameField={classNameField + " text-lg font-shafarik"}
            />

            <InputField
              label="Position"
              id={`position-${index}`}
              value={exp.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
              required
              classNameLabel={classNameLabel + " text-lg font-shafarik"}
              classNameField={classNameField + " text-lg font-shafarik"}
            />
          </div>

          <InputField
            label="Country"
            id={`country-${index}`}
            value={exp.country}
            onChange={(e) => handleChange(index, "country", e.target.value)}
            required
            classNameLabel={classNameLabel + " text-lg font-shafarik"}
            classNameField={classNameField + " text-lg font-shafarik"}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Start Date"
              id={`startDate-${index}`}
              type="date"
              value={formatDateForInput(exp.startDate)}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
              required
              classNameLabel={classNameLabel + " text-lg font-shafarik"}
              classNameField={classNameField + " text-lg font-shafarik"}
            />

            {!exp.current && (
              <InputField
                label="End Date"
                id={`endDate-${index}`}
                type="date"
                value={formatDateForInput(exp.endDate)}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                classNameLabel={classNameLabel + " text-lg font-shafarik"}
                classNameField={classNameField + " text-lg font-shafarik"}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${index}`}
              checked={exp.current}
              onChange={(e) => {
                handleChange(index, "current", e.target.checked);
                if (e.target.checked) {
                  handleChange(index, "endDate", null);
                }
              }}
            />
            <label htmlFor={`current-${index}`} className="text-lg font-shafarik">Current Position</label>
          </div>

          <TextAreaField
            label="Description"
            id={`description-${index}`}
            value={exp.description || ""}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            rows={3}
            classNameLabel={classNameLabel + " text-lg font-shafarik"}
            classNameField={classNameField + " text-lg font-shafarik"}
          />
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceSection;
