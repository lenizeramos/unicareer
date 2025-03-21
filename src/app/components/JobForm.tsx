"use client";
import React, { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Chips } from "primereact/chips";
import ButtonComp from "./ButtonComp";
import { IJobFormProps } from "../Types";


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
        <StepperPanel header="Step 1/3: General Info">
          <div className="flex flex-col space-y-4 h-12rem">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700"
              >
                Job Title <span className="text-red-500">*</span>
                <small className="block text-xs text-gray-500">
                  Enter the position's title
                </small>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Software Engineer"
                maxLength={500}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="closingDate"
                className="block text-sm font-semibold text-gray-700"
              >
                Closing Date
                <small className="block text-xs text-gray-500">
                  Select the job closing date
                </small>
              </label>
              <input
                type="date"
                id="closingDate"
                name="closingDate"
                value={
                  closingDate ? closingDate.toISOString().split("T")[0] : ""
                }
                onChange={handleDateChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="level"
                className="block text-sm font-semibold text-gray-700"
              >
                Job Level
                <small className="block text-xs text-gray-500">
                  Select the level of the position
                </small>
              </label>
              <select
                id="level"
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select the Job Level
                </option>
                <option value="entryLevel">Entry Level</option>
                <option value="intermediate">Intermediate</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-gray-700"
              >
                Employment Type{" "}
                <small className="block text-xs text-gray-500">
                  Select the type of employment
                </small>
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select the Employment Type
                </option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="salaryMin"
                className="block text-sm font-semibold text-gray-700"
              >
                Salary Min <span className="text-red-500">*</span>{" "}
                <small className="block text-xs text-gray-500">
                  Enter the minimum salary for the position
                </small>
              </label>
              <input
                type="number"
                id="salaryMin"
                name="salaryMin"
                value={salaryMin !== null ? salaryMin : ""}
                onChange={(e) =>
                  setSalaryMin(
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                placeholder="E.g. 60000"
                maxLength={500}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="salaryMax"
                className="block text-sm font-semibold text-gray-700"
              >
                Salary Max{" "}
                <small className="block text-xs text-gray-500">
                  Enter the maximum salary for the position
                </small>
              </label>
              <input
                type="number"
                id="salaryMax"
                name="salaryMax"
                value={salaryMax !== null ? salaryMax : ""}
                onChange={(e) =>
                  setSalaryMax(
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                placeholder="E.g. 90000"
                maxLength={500}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="categories"
                className="block text-sm font-semibold text-gray-700"
              >
                Categories{" "}
                <small className="block text-xs text-gray-500">
                  Select the category that best fits the role
                </small>
              </label>
              <select
                id="categories"
                name="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select the Category
                </option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-semibold text-gray-700"
              >
                Skills for this position{" "}
                <small className="block text-xs text-gray-500">
                  Enter relevant skills for the position
                </small>
              </label>
              <Chips
                className="w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Job Description{" "}
                <small className="block text-xs text-gray-500">
                  Provide a detailed description of the job role
                </small>
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                placeholder="Enter job description here..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length}/500
              </p>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700"
              >
                Location{" "}
                <small className="block text-xs text-gray-500">
                  Specify where the job is located
                </small>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter job location..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {location.length}/100
              </p>
            </div>

            <div>
              <label
                htmlFor="responsibilities"
                className="block text-sm font-semibold text-gray-700"
              >
                Responsibilities{" "}
                <small className="block text-xs text-gray-500">
                  List the key responsibilities for this role
                </small>
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                placeholder="Enter key responsibilities here..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {responsibilities.length}/500
              </p>
            </div>

            <div>
              <label
                htmlFor="whoYouAre"
                className="block text-sm font-semibold text-gray-700"
              >
                Who You Are{" "}
                <small className="block text-xs text-gray-500">
                  Describe the ideal candidate for this job
                </small>
              </label>
              <textarea
                id="whoYouAre"
                name="whoYouAre"
                value={whoYouAre}
                onChange={(e) => setWhoYouAre(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                placeholder="Describe who the ideal candidate is..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {whoYouAre.length}/500
              </p>
            </div>

            <div>
              <label
                htmlFor="niceToHave"
                className="block text-sm font-semibold text-gray-700"
              >
                Nice To Have{" "}
                <small className="block text-xs text-gray-500">
                  Mention any additional skills or experiences that are
                  desirable but not required
                </small>
              </label>
              <textarea
                id="niceToHave"
                name="niceToHave"
                value={niceToHave}
                onChange={(e) => setNiceToHave(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                placeholder="Enter any nice-to-have qualifications here..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {niceToHave.length}/500
              </p>
            </div>
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
          <div className="flex flex-col h-12rem">
            <label
              htmlFor="benefits"
              className="block text-sm font-semibold text-gray-700"
            >
              Benefits{" "}
              <small className="block text-xs text-gray-500">
                Encourage more people to apply by sharing the attractive rewards
                and benefits you offer your employees
              </small>
            </label>
            <Chips
              className="w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
