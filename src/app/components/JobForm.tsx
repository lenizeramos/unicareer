"use client";
import React, { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Chips } from "primereact/chips";
import ButtonComp from "./ButtonComp";
import { IJobFormProps } from "../Types";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";

const JobForm: React.FC<IJobFormProps> = ({ onClick }) => {
  const stepperRef = useRef(null);
  const [closingDate, setClosingDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [salaryMax, setSalaryMax] = useState<number | null>(null);
  const [categories, setCategories] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [whoYouAre, setWhoYouAre] = useState("");
  const [niceToHave, setNiceToHave] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);

  const classNameDivContainer = "flex flex-col lg:flex-row lg:items-start";
  const classNameLabel =
    "text-sm font-semibold text-gray-700 lg:w-1/5 lg:pr-4";
  const classNameDivLgWidth = "lg:w-4/5";
  const classNameField =
    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setClosingDate(new Date(selectedDate));
    } else {
      setClosingDate(null);
    }
  };

  const handleSubmit = () => {
    if (!title || !salaryMin) {
      alert("Please fill in all required fields.");
      return;
    }
    onClick({
      closingDate,
      title,
      level,
      type,
      salaryMin,
      salaryMax,
      categories,
      skills,
      description,
      location,
      responsibilities,
      whoYouAre,
      niceToHave,
      benefits,
    });
  };
  return (
    <div className="w-full flex justify-content-center">
      <Stepper ref={stepperRef}>
        <StepperPanel header="Step 1/3: Job Info">
          <div className="flex flex-col space-y-4 h-12rem">
            <InputField
              label="Job Title"
              small="Enter the title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Software Engineer"
              required
              maxLength={500}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />

            <InputField
              label="Closing Date"
              small="Select the job closing date"
              id="closingDate"
              name="closingDate"
              value={closingDate ? closingDate.toISOString().split("T")[0] : ""}
              onChange={handleDateChange}
              type="date"
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameField={classNameField}
            />

            <SelectField
              label="Job Level"
              small="Select the level of the position"
              id="level"
              name="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              options={[
                { value: "entryLevel", label: "Entry Level" },
                { value: "intermediate", label: "Intermediate" },
                { value: "senior", label: "Senior" },
              ]}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />

            <SelectField
              label="Employment Type"
              small="Select the type of employment"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "full-time", label: "Full-Time" },
                { value: "part-time", label: "Part-Time" },
                { value: "freelance", label: "Freelance" },
              ]}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />
           
              <InputField
                label="Salary Min"
                id="salaryMin"
                name="salaryMin"
                value={salaryMin}
                onChange={(e) =>
                  setSalaryMin(
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                type="number"
                required
                placeholder="E.g. 60000"
                classNameLabel={classNameLabel}
                classNameField={classNameField}
              />

              <InputField
                label="Salary Max"
                id="salaryMax"
                name="salaryMax"
                value={salaryMax}
                onChange={(e) =>
                  setSalaryMax(
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                type="number"
                placeholder="E.g. 90000"
                classNameLabel={classNameLabel}
                classNameField={classNameField}
              />
            

            <SelectField
              label="Categories"
              small="Select the category that best fits the role"
              id="categories"
              name="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              options={[
                { value: "marketing", label: "Marketing" },
                { value: "design", label: "Design" },
                { value: "development", label: "Development" },
              ]}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />

<div className="flex">
              <label
                htmlFor="skills"
                className="w-1/5 text-sm font-semibold text-gray-700"
              >
                Skills for this position
                <small className="block text-xs text-gray-500">
                  Enter relevant skills for the position
                </small>
              </label>
              <Chips
                className="w-4/5 text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                itemTemplate={(skill) => (
                  <div className="text-gray-700 px-3 py-1 text-sm font-medium flex items-center mr-2">
                    {skill}
                  </div>
                )}
                value={skills}
                onChange={(e) => setSkills(e.value ? e.value : [])}
                separator=","
                placeholder="E.g., React, Node.js, Java"
              />
            </div>

          </div>
          <div className="flex pt-4 justify-end">
            <ButtonComp
              text="Next"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>

        <StepperPanel header="Step 2/3: Job Detail">
          <div className="flex flex-col space-y-4 h-12rem">
            <TextAreaField
              label="Job Description"
              small="Provide a detailed description of the job role"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter job description here..."
              maxLength={500}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />
            <InputField
              label="Location"
              small="Specify where the job is located"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter job location..."
              maxLength={100}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />
            <TextAreaField
              label="Responsibilities"
              small="List the key responsibilities for this role"
              id="responsibilities"
              name="responsibilities"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Enter key responsibilities here..."
              maxLength={500}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />
            <TextAreaField
              label="Who You Are"
              small="Describe the ideal candidate for this job"
              id="whoYouAre"
              name="whoYouAre"
              value={whoYouAre}
              onChange={(e) => setWhoYouAre(e.target.value)}
              placeholder="Describe who the ideal candidate is..."
              maxLength={500}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />
            <TextAreaField
              label="Nice To Have"
              small="Mention any additional skills or experiences that are
                  desirable but not required"
              id="niceToHave"
              name="niceToHave"
              value={niceToHave}
              onChange={(e) => setNiceToHave(e.target.value)}
              placeholder="Enter any nice-to-have qualifications here..."
              maxLength={500}
              classNameDivContainer={classNameDivContainer}
              classNameLabel={classNameLabel}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField}
            />
          </div>

          <div className="flex pt-4 justify-between">
            <ButtonComp
              text="Back"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <ButtonComp
              text="Next"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>

        <StepperPanel header="Step 3/3: Benefits">
          <div className={classNameDivContainer}>
            <label
              htmlFor="benefits"
              className="block text-sm font-semibold text-gray-700 lg:w-2/5 lg:pr-4"
            >
              Benefits
              <small className="block text-xs text-gray-500">
                Encourage more people to apply by sharing the attractive rewards
                and benefits you offer your employees
              </small>
            </label>
            <Chips
              className="lg:w-3/5 text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              itemTemplate={(benefits) => (
                <div className="text-gray-700 px-3 py-1 text-sm font-medium flex items-center mr-2">
                  {benefits}
                </div>
              )}
              value={benefits}
              onChange={(e) => setBenefits(e.value ? e.value : [])}
              separator=","
              placeholder="E.g., Health Insurance, Skill Development"
            />
          </div>

          <div className="flex pt-4 justify-between">
            <ButtonComp
              text="Back"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <ButtonComp
              text="Submit"
              IsWhite={false}
              width="w-[120px]"
              onClick={handleSubmit}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
};

export default JobForm;
