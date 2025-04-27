import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
      setBio(initialData.bio || "");
      setSkills(initialData.skills || []);
      setEducation(
        (initialData.education || []).map((edu) => ({
          ...edu,
          current: edu.current ?? false,
        }))
      );
      setWorkExperience(
        (initialData?.workExperience || []).map((exp) => ({
          ...exp,
          current: exp.current ?? false,
        }))
      );
      setLanguages(initialData.languages || []);
      setStreetAddress(initialData.user?.streetAddress || "");
      setCity(initialData.user?.city || "");
      setProvince(initialData.user?.province || "");
      setPostalCode(initialData.user?.postalCode || "");
      setWebsite(initialData.user?.website || "");
      setLinkedIn(initialData.user?.linkedIn || "");
      setTwitter(initialData.user?.twitter || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      firstName,
      lastName,
      skills,
      bio,
      education,
      workExperience,
      languages,
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
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-8"
    >
      {/* Personal Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
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
            classNameLabel={classNameLabel + " text-[20px] font-shafarik inline-flex items-center"}
            classNameField={classNameField + " text-[20px] font-shafarik"}
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
            classNameLabel={classNameLabel + " text-[20px] font-shafarik inline-flex items-center"}
            classNameField={classNameField + " text-[20px] font-shafarik"}
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
            classNameLabel={classNameLabel + " text-[20px] font-shafarik"}
            classNameField={classNameField + " text-[20px] font-shafarik"}
          />
        </div>

        {/* Right Column */}
        <div className="flex items-center justify-center">
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
        </div>
      </div>

      {/* Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField
          label="Street Address"
          id="streetAddress"
          name="streetAddress"
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
        />

        <InputField
          label="City"
          id="city"
          name="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
        />

        <SelectField
          label="Province"
          id="province"
          name="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          options={canadianProvinces}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
        />

        <InputField
          label="Country"
          id="country"
          name="country"
          type="text"
          value="Canada"
          onChange={() => {}}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
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
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
        />
      </div>

      {/* Skills Section */}
      <div className="space-y-6">
        <ChipsField
          label="Skills"
          value={skills}
          onChange={setSkills}
          className="w-full text-gray-700 rounded-lg"
          containerClass="space-y-2"
          labelClass={classNameLabel + " text-[20px] font-shafarik"}
          itemTemplate={(skill) => <div>{skill}</div>}
        />
      </div>

      {/* Social Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputField
          label="Website"
          id="website"
          name="website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://example.com"
          classNameDivContainer="flex flex-col"
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
        />

        <InputField
          label="LinkedIn"
          id="linkedIn"
          name="linkedIn"
          type="url"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          placeholder="https://linkedin.com/in/example"
          classNameDivContainer="flex flex-col"
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
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
          classNameLabel="text-[20px] font-shafarik"
          classNameField={classNameField + " text-[20px] font-shafarik"}
        />
      </div>

      {/* Education, Work Experience, and Languages Sections */}
      <div className="space-y-8">
        <EducationSection education={education} onChange={setEducation} />
        <WorkExperienceSection
          experience={workExperience}
          onChange={setWorkExperience}
        />
        <LanguagesSection languages={languages} onChange={setLanguages} />
      </div>

      <div className="flex justify-end pt-6">
        <ButtonComp text="Submit" IsWhite={false} width="w-full md:w-auto" />
      </div>
    </form>
  );
};

export default CandidateForm;
