import React, { useState } from "react";
import ChipsField from "./ChipsField";
import { ICandidateFormProps } from "../Types/index";
import { ICandidate } from "@/app/Types/slices";
import ButtonComp from "@/app/components/ButtonComp";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";
import {
  classNameLabel,
  classNameField,
  classNameDivContainerTextArea,
} from "@/app/constants/index";
import EducationSection from "./EducationSection";
import WorkExperienceSection from "./WorkExperienceSection";
import LanguagesSection from "./LanguagesSection";
import FileUpload from "./FileUpload";

const CandidateForm: React.FC<ICandidateFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [bio, setBio] = useState(initialData?.bio || "");
  const [education, setEducation] = useState(
    (initialData?.education || []).map((edu) => ({
      ...edu,
      current: edu.current ?? false,
    }))
  );
  const [workExperience, setWorkExperience] = useState(
    (initialData?.workExperience || []).map((exp) => ({
      ...exp,
      current: exp.current ?? false,
    }))
  );
  const [languages, setLanguages] = useState(initialData?.languages || []);
  const [streetAddress, setStreetAddress] = useState(
    initialData?.user?.streetAddress || ""
  );
  const [city, setCity] = useState(initialData?.user?.city || "");
  const [province, setProvince] = useState(initialData?.user?.province || "");
  const [postalCode, setPostalCode] = useState(
    initialData?.user?.postalCode || ""
  );
  const [website, setWebsite] = useState(initialData?.user?.website || "");
  const [linkedIn, setLinkedIn] = useState(initialData?.user?.linkedIn || "");
  const [twitter, setTwitter] = useState(initialData?.user?.twitter || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      firstName,
      lastName,
      skills,
      bio,
      //education,
      //workExperience,
      //languages,
      user: {
        streetAddress,
        city,
        province,
        postalCode,
        website,
        linkedIn,
        twitter,
      },
    }) as ICandidate;
  };

  const canadianProvinces = [
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon" },
  ];

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
            userId={initialData?.id ?? ""}
            uploadText="Upload your profile image"
            maxSizeMB={5}
            onUploadComplete={() => {}}
          />

          <InputField
            label="Street Address"
            id="streetAddress"
            name="streetAddress"
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
          />
          <InputField
            label="City"
            id="city"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
          />

          <SelectField
            label="Province"
            id="province"
            name="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            options={canadianProvinces}
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
          />

          <InputField
            label="Country"
            id="country"
            name="country"
            type="text"
            value="Canada"
            onChange={() => {}}
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
            disabled={true}
          />

          <InputField
            label="Postal Code"
            id="postalCode"
            name="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
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
          <InputField
            label="Website"
            id="website"
            name="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
          />
          <InputField
            label="LinkedIn"
            id="linkedIn"
            name="linkedIn"
            type="url"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            placeholder="https://linkedin.com/company/example"
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
          />

          <InputField
            label="Twitter"
            id="twitter"
            name="twitter"
            type="url"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="https://twitter.com/example"
            classNameDivContainer="flex flex-col"
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
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

          <EducationSection education={education} onChange={setEducation} />

          <WorkExperienceSection
            experience={workExperience}
            onChange={setWorkExperience}
          />

          <LanguagesSection languages={languages} onChange={setLanguages} />
        </div>

        <div className="flex justify-end">
          <ButtonComp text="Submit" IsWhite={false} width="w-full md:w-auto" />
        </div>
      </form>
    </>
  );
};

export default CandidateForm;
