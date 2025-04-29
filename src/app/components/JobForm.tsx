"use client";
import React, { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import ChipsField from "./ChipsField";
import ButtonComp from "./ButtonComp";
import { IJob, IJobFormProps } from "../Types";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";
import SalaryRangeSlider from "./SalaryRangeSlider";
import {
  classNameDivContainer,
  classNameDivLgWidth,
  classNameField,
  classNamePadding,
  categoriesArray,
  jobsTypes,
  jobLevel,
} from "@/app/constants/index";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/context/store";
import { clearJobToEdit } from "@/app/context/slices/jobToEditSlices";

const JobForm: React.FC<IJobFormProps> = ({ onClick, initialData }) => {
  const stepperRef = useRef<Stepper | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [closingDate, setClosingDate] = useState<Date | null>(
    initialData?.closingDate ? new Date(initialData.closingDate) : null
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [level, setLevel] = useState(initialData?.level || "");
  const [type, setType] = useState(initialData?.type || "");
  const [categories, setCategories] = useState(initialData?.categories || "");
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [responsibilities, setResponsibilities] = useState(
    initialData?.responsibilities || ""
  );
  const [whoYouAre, setWhoYouAre] = useState(initialData?.whoYouAre || "");
  const [niceToHave, setNiceToHave] = useState(initialData?.niceToHave || "");
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits || []
  );
  const [salary, setSalary] = useState<[number, number]>(
    initialData?.salary ||
      (initialData?.salaryMin && initialData?.salaryMax
        ? [initialData.salaryMin, initialData.salaryMax]
        : [10, 100])
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setClosingDate(new Date(selectedDate));
    } else {
      setClosingDate(null);
    }
  };
  const toLocalISOString = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
  };

  const handleSubmit = () => {
    if (!title) {
      alert("Please fill in all required fields.");
      return;
    }
    onClick({
      id: initialData?.id,
      closingDate,
      title,
      level,
      type,
      salary,
      categories,
      skills,
      description,
      location,
      responsibilities,
      whoYouAre,
      niceToHave,
      benefits,
    } as IJob);
    dispatch(clearJobToEdit());
  };

  return (
    <div className="w-full flex justify-center">
      <Stepper ref={stepperRef}>
        <StepperPanel header="Step 1/3: Job Info">
          <div className="flex flex-col space-y-4 font-shafarik pt-2 md:pt-0">
            <div className={classNamePadding}>
              <InputField
                label="Job Title"
                small="Enter the title"
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Software Engineer"
                required
                maxLength={100}
                classNameDivContainer={classNameDivContainer + " text-lg font-shafarik"}
                classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
                classNameDivLgWidth={classNameDivLgWidth}
                classNameField={classNameField + " text-lg font-shafarik"}
              />
            </div>

            <div className={classNamePadding}>
              <InputField
                label="Closing Date"
                small="Select the job closing date"
                id="closingDate"
                name="closingDate"
                type="datetime-local"
                minDate={toLocalISOString(new Date())}
                value={closingDate ? toLocalISOString(closingDate) : ""}
                onChange={handleDateChange}
                classNameDivContainer={classNameDivContainer + " text-lg font-shafarik"}
                classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
                classNameField={classNameField + " text-lg font-shafarik"}
                required={true}
              />
            </div>

            <div className={classNamePadding}>
              <SelectField
                label="Job Level"
                small="Select the level of the position"
                id="level"
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                options={jobLevel.map((option, index) => ({
                  value: option.toLowerCase(),
                  label: option,
                  key: index,
                }))}
                classNameDivContainer={classNameDivContainer + " text-lg font-shafarik"}
                classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
                classNameDivLgWidth={classNameDivLgWidth}
                classNameField={classNameField + " text-lg font-shafarik"}
                required={true}
              />
            </div>

            <div className={classNamePadding}>
              <SelectField
                label="Employment Type"
                small="Select the type of employment"
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={jobsTypes.map((option, index) => ({
                  value: option.toLowerCase(),
                  label: option,
                  key: index,
                }))}
                classNameDivContainer={classNameDivContainer + " text-lg font-shafarik"}
                classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
                classNameDivLgWidth={classNameDivLgWidth + "lg:w-4/5"}
                classNameField={classNameField + " text-lg font-shafarik"}
                required={true}
              />
            </div>

            <div className={classNamePadding}>
              <SalaryRangeSlider
                label="Salary - Per hour"
                small="Select the range salary, change the minimun and maximun salary per hour"
                id="salaryRange"
                min={10}
                max={100}
                step={1}
                initialValues={salary}
                onChange={(newValues: number[]) =>
                  setSalary(newValues as [number, number])
                }
                classNameDivContainer={classNameDivContainer + "font-shafarik"}
                classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
                classNameDivLgWidth={"lg:w-4/5"}
              />
            </div>

            <div className={classNamePadding}>
              <SelectField
                label="Category"
                small="Select the category that best fits the role"
                id="categories"
                name="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                options={categoriesArray.map((option, index) => ({
                  value: option.toLowerCase(),
                  label: option,
                  key: index,
                }))}
                classNameDivContainer={classNameDivContainer + " text-lg font-shafarik"}
                classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
                classNameDivLgWidth={classNameDivLgWidth}
                classNameField={classNameField + " text-lg font-shafarik"}
                required={true}
              />
            </div>

            <ChipsField
              label="Skills for this position"
              value={skills}
              onChange={setSkills}
              className="lg:w-4/5 text-gray-700 rounded-md font-shafarik"
              containerClass={`${classNameDivContainer} ${classNamePadding}`}
              labelClass={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
              helperText="Enter relevant skills for the position - max 100 skills - comma ',' separated."
              itemTemplate={(skill) => (
                <div className="text-gray-700 px-3 py-1 text-sm font-medium flex items-center mr-2 font-shafarik">
                  {skill}
                </div>
              )}
              placeholder="E.g., React, Node.js, Java"
            />
          </div>
          <div className="flex pt-4 justify-end">
            <ButtonComp
              text="Next"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current?.nextCallback?.()}
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
              maxLength={1000}
              classNameDivContainer={classNameDivContainer + " font-shafarik"}
              classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField + " font-shafarik"}
              required={true}
            />
            <InputField
              label="Location"
              small="Specify where the job is located"
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter job location..."
              maxLength={100}
              classNameDivContainer={classNameDivContainer + " font-shafarik"}
              classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField + " font-shafarik"}
            />
            <TextAreaField
              label="Responsibilities"
              small="List the key responsibilities for this role"
              id="responsibilities"
              name="responsibilities"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Enter key responsibilities here..."
              maxLength={1000}
              classNameDivContainer={classNameDivContainer + " font-shafarik"}
              classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField + " font-shafarik"}
            />
            <TextAreaField
              label="Who You Are"
              small="Describe the ideal candidate for this job"
              id="whoYouAre"
              name="whoYouAre"
              value={whoYouAre}
              onChange={(e) => setWhoYouAre(e.target.value)}
              placeholder="Describe who the ideal candidate is..."
              maxLength={1000}
              classNameDivContainer={classNameDivContainer + " font-shafarik"}
              classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField + " font-shafarik"}
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
              maxLength={1000}
              classNameDivContainer={classNameDivContainer + " font-shafarik"}
              classNameLabel={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
              classNameDivLgWidth={classNameDivLgWidth}
              classNameField={classNameField + " font-shafarik"}
            />
          </div>

          <div className="flex pt-4 justify-between">
            <ButtonComp
              text="Back"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current?.prevCallback()}
            />
            <ButtonComp
              text="Next"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current?.nextCallback?.()}
            />
          </div>
        </StepperPanel>

        <StepperPanel header="Step 3/3: Benefits">
          <ChipsField
            label="Benefits"
            value={benefits}
            onChange={setBenefits}
            className="lg:w-4/5 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-shafarik"
            containerClass={classNameDivContainer + " font-shafarik"}
            labelClass={"text-lg font-semibold text-gray-700 font-shafarik lg:w-1/5"}
            helperText="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees - max 100 benefits - comma ',' separated"
            itemTemplate={(benefit) => (
              <div className="text-gray-700 px-3 py-1 text-sm font-medium flex items-center mr-2 font-shafarik">
                {benefit}
              </div>
            )}
            placeholder="E.g., Health Insurance, Skill Development"
          />

          <div className="flex pt-4 justify-between">
            <ButtonComp
              text="Back"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current?.prevCallback()}
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
