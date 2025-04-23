import React, { useEffect, useState } from "react";
import { ICompanyFormProps } from "@/app/Types/index";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import ButtonComp from "@/app/components/ButtonComp";
import {
  classNameDivContainerTextArea,
  classNameField,
} from "@/app/constants/index";
import FileUpload from "./FileUpload";

const CompanyForm: React.FC<ICompanyFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userId, setUserId] = useState<string>("");

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

    onSubmit({ name, logo: null, bio, userId });
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

        <div className="flex justify-end">
          <ButtonComp text="Submit" IsWhite={false} width="w-full md:w-auto" />
        </div>
      </form>
    </>
  );
};

export default CompanyForm;
