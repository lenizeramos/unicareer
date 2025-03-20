"use client";
import React, { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Chips } from "primereact/chips";
import ButtonComp from "./ButtonComp";
import { IJobFormProps } from "../Types";

export default function JobForm({ onClick }: IJobFormProps) {
  const stepperRef = useRef(null);
  const [closingDate, setClosingDate] = useState("");
  const [title, setTitle] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [type, setType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [categories, setCategories] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [whoYouAre, setWhoYouAre] = useState("");
  const [niceToHave, setNiceToHave] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);

  const handleSubmit = () => {
    onClick({
      closingDate,
      title,
      jobLevel,
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
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="closingDate"
                className="block text-sm font-semibold text-gray-700"
              >
                Closing Date
              </label>
              <input
                type="date"
                id="closingDate"
                name="closingDate"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="jobLevel"
                className="block text-sm font-semibold text-gray-700"
              >
                Job Level
              </label>
              <select
                id="jobLevel"
                name="jobLevel"
                value={jobLevel}
                onChange={(e) => setJobLevel(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
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
                Employment Type
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
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
                Salary Min
              </label>
              <input
                type="number"
                id="salaryMin"
                name="salaryMin"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="salaryMax"
                className="block text-sm font-semibold text-gray-700"
              >
                Salary Max
              </label>
              <input
                type="number"
                id="salaryMax"
                name="salaryMax"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="categories"
                className="block text-sm font-semibold text-gray-700"
              >
                Categories
              </label>
              <select
                id="categories"
                name="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
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
                Skills for this position
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

        <StepperPanel header="Step 2/3: Job Details">
          <div className="flex flex-col space-y-4 h-12rem">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="responsibilities"
                className="block text-sm font-semibold text-gray-700"
              >
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
              />
            </div>

            <div>
              <label
                htmlFor="whoYouAre"
                className="block text-sm font-semibold text-gray-700"
              >
                Who You Are
              </label>
              <textarea
                id="whoYouAre"
                name="whoYouAre"
                value={whoYouAre}
                onChange={(e) => setWhoYouAre(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
              />
            </div>

            <div>
              <label
                htmlFor="niceToHave"
                className="block text-sm font-semibold text-gray-700"
              >
                Nice To Have
              </label>
              <textarea
                id="niceToHave"
                name="niceToHave"
                value={niceToHave}
                onChange={(e) => setNiceToHave(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
              />
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
              Benefits
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
}
