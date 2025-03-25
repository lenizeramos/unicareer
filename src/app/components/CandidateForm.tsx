import React, { useState } from "react";
import { Chips } from "primereact/chips";
import { ICandidateFormProps } from "../Types/candidate";
import ButtonComp from "@/app/components/ButtonComp";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { LuFileText } from "react-icons/lu";
import { RxImage } from "react-icons/rx";

const CandidateForm: React.FC<ICandidateFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [bio, setBio] = useState("");

  const classNameDivContainer = "space-y-2";
  const classNameDivContainerTextArea = "md:col-span-2 space-y-2";
  const classNameLabel = "block text-sm font-medium text-gray-700";
  const classNameField =
    "w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640de] focus:border-transparent transition";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName,
      photo,
      skills,
      resume,
      bio,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Candidate Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          maxLength={100}
          classNameDivContainer={classNameDivContainer}
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
          classNameDivContainer={classNameDivContainer}
          classNameLabel={classNameLabel}
          classNameField={classNameField}
        />

        <InputField
          label="Photo"
          id="photo"
          type="file"
          onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
          classNameDivContainer="space-y-2"
          classNameLabel="block text-sm font-medium text-gray-700"
          accept="image/*"
          fileLabel={photo ? photo.name : "Upload photo"}
          filePreview={<RxImage className="h-6 w-6" />}
        />

        <InputField
          label="Resume"
          id="resume"
          type="file"
          onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
          classNameDivContainer="space-y-2"
          classNameLabel="block text-sm font-medium text-gray-700"
          accept=".pdf,.doc,.docx"
          fileLabel={resume ? resume.name : "Upload resume"}
          filePreview={<LuFileText className="h-6 w-6" />}
        />

        <div className="md:col-span-2 space-y-2">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          <Chips
            className="w-full  text-gray-700  rounded-lg "
            itemTemplate={(skill) => <div>{skill}</div>}
            value={skills}
            onChange={(e) => setSkills(e.value ? e.value : [])}
            separator=","
          />
        </div>

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
  );
};

export default CandidateForm;
