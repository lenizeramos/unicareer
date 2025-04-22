import React, { useState } from "react";
import ChipsField from "./ChipsField";
import { ICandidateFormProps } from "../Types/index";
import ButtonComp from "@/app/components/ButtonComp";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { RxImage } from "react-icons/rx";
import {
  classNameLabel,
  classNameField,
  classNameDivContainerTextArea,
} from "@/app/constants/index";
import EducationSection from './EducationSection';
import WorkExperienceSection from './WorkExperienceSection';
import LanguagesSection from './LanguagesSection';
import FileUpload from "./FileUpload";

const CandidateForm: React.FC<ICandidateFormProps> = ({ onSubmit, initialData }) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [bio, setBio] = useState(initialData?.bio || "");
  const [education, setEducation] = useState(initialData?.education || []);
  const [workExperience, setWorkExperience] = useState(initialData?.workExperience || []);
  const [languages, setLanguages] = useState(initialData?.languages || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      firstName,
      lastName,
      photo,
      skills,
      bio,
      education,
      workExperience,
      languages,
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">
        Candidate Information
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
      >
        <div className="space-y-6">
          <InputField
            label="First Name"
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            maxLength={100}
            classNameDivContainer="flex flex-col"
            classNameLabel={classNameLabel}
            classNameField={classNameField}
          />

          <InputField
            label="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            maxLength={100}
            classNameDivContainer="flex flex-col"
            classNameLabel={classNameLabel}
            classNameField={classNameField}
          />

          <FileUpload
            allowedFileTypes={["image/jpeg", "image/png"]}
            apiRoute="/api/upload"
            modelName="userProfileImage"
            fieldName="fileKey"
            userId={initialData?.id}
            uploadText="Upload your profile image"
            maxSizeMB={5}
            onUploadComplete={() => {}}
          />

          <ChipsField
            label="Skills"
            value={skills}
            onChange={setSkills}
            className="w-full text-gray-700 rounded-lg"
            containerClass="md:col-span-2 space-y-2"
            labelClass={classNameLabel}
            itemTemplate={(skill) => <div>{skill}</div>}
          />

          <TextAreaField
            label="Bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            name="bio"
            maxLength={500}
            classNameDivContainer={classNameDivContainerTextArea}
            classNameLabel={classNameLabel}
            classNameField={classNameField}
          />

          <EducationSection 
            education={education}
            onChange={setEducation}
          />

          <WorkExperienceSection 
            experience={workExperience}
            onChange={setWorkExperience}
          />

          <LanguagesSection 
            languages={languages}
            onChange={setLanguages}
          />
        </div>

        <div className="flex justify-end">
          <ButtonComp text="Submit" IsWhite={false} width="w-full md:w-auto" />
        </div>
      </form>
    </>
  );
};

export default CandidateForm;
