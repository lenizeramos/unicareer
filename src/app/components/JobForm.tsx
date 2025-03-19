"use client";
import React, { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Chips } from "primereact/chips";
import ButtonComp from "./ButtonComp";

export default function JobForm({ onClick }) {
  const stepperRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    /* location: "",
    salary: "",
    type: "full-time", */
  });
  const [skills, setSkills] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData, "FormDATAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(skills, "skillsSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    onClick( formData, skills);
  };
  return (
    <div className="card flex justify-content-center">
      <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
        <StepperPanel header="Step 1/3">
          <div className="flex flex-col space-y-4 h-12rem">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

           {/*  <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type of Employment
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="remote">Remote</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select> */}

            {/* <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            /> */}

            <label
              htmlFor="skills"
              className="block text-sm font-semibold text-gray-700"
            >
              Skills
            </label>
            <Chips
              className="w-full chips text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex pt-4 justify-end">
            <ButtonComp
              text="Next"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>

        <StepperPanel header="Step 2/3">
          <div className="flex flex-col space-y-4 h-12rem">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            />

            {/* <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            /> */}
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

        <StepperPanel header="Step 3/3">
          <div className="flex flex-column h-12rem"></div>

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
