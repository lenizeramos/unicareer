import React, { useState } from "react";

interface CandidateFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    photo: File | null;
    skills: string;
    resume: File | null;
    bio: string;
  }) => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [bio, setBio] = useState("");

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
      className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4"
    >
      <div>
        <label
          htmlFor="firstName"
          className="block text-gray-700 font-semibold"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-gray-700 font-semibold">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="photo" className="block text-gray-700 font-semibold">
          Photo
        </label>
        <input
          type="file"
          id="photo"
          onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
          className="w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="skills" className="block text-gray-700 font-semibold">
          Skills
        </label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <small className="text-gray-500">
          Separate skills with commas (e.g., JavaScript, React, Node.js)
        </small>
      </div>

      <div>
        <label htmlFor="resume" className="block text-gray-700 font-semibold">
          Resume
        </label>
        <input
          type="file"
          id="resume"
          onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
          className="w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-gray-700 font-semibold">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default CandidateForm;
