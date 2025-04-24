import React, { useEffect, useState } from "react";
import { ICompanyFormProps } from "@/app/Types/index";
import InputField from "./InputField";
import { ICompany } from "@/app/Types/slices";
import TextAreaField from "./TextAreaField";
import ButtonComp from "@/app/components/ButtonComp";
import {
  classNameDivContainerTextArea,
  classNameField,
} from "@/app/constants/index";
import FileUpload from "./FileUpload";
import SelectField from "./SelectField";
import ChipsField from "./ChipsField";

const CompanyForm: React.FC<ICompanyFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState(initialData?.name || "");
  const [bio, setBio] = useState(initialData?.bio || "");

  const [website, setWebsite] = useState(initialData?.website || "");
  const [size, setSize] = useState(initialData?.size || "");
  const [industry, setIndustry] = useState(initialData?.industry || "");

  const [streetAddress, setStreetAddress] = useState(
    initialData?.streetAddress || ""
  );
  const [city, setCity] = useState(initialData?.city || "");
  const [province, setProvince] = useState(initialData?.province || "");
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || "");

  const [foundedYear, setFoundedYear] = useState(
    initialData?.foundedYear || ""
  );
  const [linkedIn, setLinkedIn] = useState(initialData?.linkedIn || "");
  const [twitter, setTwitter] = useState(initialData?.twitter || "");
  const [toolsAndTechnologies, setToolsAndTechnologies] = useState<string[]>(
    initialData?.toolsAndTechnologies || []
  );
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits || []
  );

  console.log("initialData", initialData);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setBio(initialData.bio || "");
      setWebsite(initialData.website || "");
      setSize(initialData.size || "");
      setIndustry(initialData.industry || "");
      setStreetAddress(initialData.streetAddress || "");
      setCity(initialData.city || "");
      setProvince(initialData.province || "");
      setPostalCode(initialData.postalCode || "");
      setFoundedYear(initialData.foundedYear || "");
      setLinkedIn(initialData.linkedIn || "");
      setTwitter(initialData.twitter || "");
      setToolsAndTechnologies(initialData.toolsAndTechnologies || []);
      setBenefits(initialData.benefits || []);
    }
  }, [initialData]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await fetch("/api/user/get-user-by-clerk-id", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.log("Failed to fetch user ID:", data.error);
        }
        setUserId(data.id);
      } catch (error) {
        if (userId === "") {
          console.log("Failed to fetch user ID:", error);
        }
      }
    };

    getUserId();
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      name,
      bio,
      website,
      size,
      industry,
      streetAddress,
      city,
      province,
      postalCode,
      foundedYear,
      linkedIn,
      twitter,
      toolsAndTechnologies,
      benefits,
      userId,
    } as ICompany);
  };

  const companySizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: "1001+", label: "1001+ employees" },
  ];

  const industries = [
    { value: "tech", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
  ];

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
        Company Information
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4"
      >
        <InputField
          label="Company Name"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-sm font-semibold text-gray-700"
          classNameField={classNameField}
        />

        <FileUpload
          allowedFileTypes={["image/jpeg", "image/png"]}
          apiRoute="/api/upload"
          modelName="userProfileImage"
          fieldName="fileKey"
          userId={userId}
          uploadText="Upload the logo of your company"
          maxSizeMB={5}
          onUploadComplete={() => {}}
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
          classNameLabel="text-sm font-semibold text-gray-700"
          classNameField={classNameField}
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

        <SelectField
          label="Company Size"
          id="size"
          name="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          options={companySizes}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-sm font-semibold text-gray-700"
          classNameField={classNameField}
        />

        <SelectField
          label="Industry"
          id="industry"
          name="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          options={industries}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-sm font-semibold text-gray-700"
          classNameField={classNameField}
        />

        <InputField
          label="Founded Year"
          id="foundedYear"
          name="foundedYear"
          type="number"
          value={foundedYear}
          onChange={(e) => setFoundedYear(e.target.value)}
          classNameDivContainer="flex flex-col"
          classNameLabel="text-sm font-semibold text-gray-700"
          classNameField={classNameField}
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

        <ChipsField
          label="Tools & Technologies"
          value={toolsAndTechnologies}
          onChange={setToolsAndTechnologies}
          className="w-full text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          containerClass="flex flex-col"
          labelClass="text-sm font-semibold text-gray-700"
          helperText="List the technologies or tools relevant to this role."
          itemTemplate={(tech) => (
            <div className="text-gray-700 px-3 py-1 text-sm font-medium flex items-center mr-2">
              {tech}
            </div>
          )}
          placeholder="E.g., React, Node.js, AWS"
        />

        <ChipsField
          label="Benefits"
          value={benefits}
          onChange={setBenefits}
          className="w-full text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          containerClass="flex flex-col"
          labelClass="text-sm font-semibold text-gray-700"
          helperText="Highlight what makes your company a great place to work—supportive culture, flexible work environment, or unique perks."
          itemTemplate={(benefit) => (
            <div className="text-gray-700 px-3 py-1 text-sm font-medium flex items-center mr-2">
              {benefit}
            </div>
          )}
          placeholder="E.g., Collaborative Culture, Remote Friendly, Team Events"
        />

        <div className="flex justify-end">
          <ButtonComp text="Submit" IsWhite={false} width="w-full md:w-auto" />
        </div>
      </form>
    </>
  );
};

export default CompanyForm;
