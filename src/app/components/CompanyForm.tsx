import React, { useState } from "react";
import { ICompanyFormProps } from "@/app/Types/index";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { RxImage } from "react-icons/rx";
import ButtonComp from "@/app/components/ButtonComp";

const CompanyForm: React.FC<ICompanyFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [bio, setBio] = useState("");

  const classNameDivContainer = "space-y-2";
  const classNameDivContainerTextArea = "md:col-span-2 space-y-2";
  const classNameLabel = "block text-sm font-medium text-gray-700";
  const classNameField =
    "w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640de] focus:border-transparent transition";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, logo, bio });
  };

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
          classNameDivContainer={classNameDivContainer}
          classNameLabel={classNameLabel}
          classNameField={classNameField}
        />

        <InputField
          label="Company Logo"
          id="logo"
          type="file"
          onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
          classNameDivContainer="space-y-2"
          classNameLabel="block text-sm font-medium text-gray-700"
          accept="image/*"
          fileLabel={logo ? logo.name : "Upload logo"}
          filePreview={<RxImage className="h-6 w-6" />}
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

        <div className="flex justify-end">
          <ButtonComp text="Submit" IsWhite={false} width="w-full md:w-auto" />
        </div>
      </form>
    </>
  );
};

export default CompanyForm;
