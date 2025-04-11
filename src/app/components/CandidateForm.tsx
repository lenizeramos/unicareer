import React, { useState } from "react";
import ChipsField from "./ChipsField";
import { ICandidateFormProps } from "../Types/index";
import ButtonComp from "@/app/components/ButtonComp";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { LuFileText } from "react-icons/lu";
import { RxImage } from "react-icons/rx";
import {
  classNameLabel,
  classNameField,
  classNameDivContainerTextArea,
} from "@/app/constants/index";

const CandidateForm: React.FC<ICandidateFormProps> = ({ onSubmit, initialData }) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [bio, setBio] = useState(initialData?.bio || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      firstName,
      lastName,
      photo,
      skills,
      bio,
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
            classNameLabel="text-sm font-semibold text-gray-700"
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
            classNameLabel="text-sm font-semibold text-gray-700"
            classNameField={classNameField}
          />

          <InputField
            label="Photo"
            id="photo"
            type="file"
            onChange={(e) =>
              setPhoto(e.target.files ? e.target.files[0] : null)
            }
            classNameDivContainer="space-y-2"
            classNameLabel="text-sm font-semibold text-gray-700"
            accept="image/*"
            fileLabel={photo ? photo.name : "Upload photo"}
            filePreview={<RxImage className="h-6 w-6" />}
          />

          <ChipsField
            label="Skills"
            value={skills}
            onChange={setSkills}
            className="w-full text-gray-700 rounded-lg"
            containerClass="md:col-span-2 space-y-2"
            labelClass="text-sm font-semibold text-gray-700"
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
        </div>

        <div className="flex justify-end">
          <ButtonComp text="Submit" IsWhite={false} width="w-full md:w-auto" />
        </div>
      </form>
    </>
  );
};

export default CandidateForm;
