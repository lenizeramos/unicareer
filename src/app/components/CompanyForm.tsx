import React, { useState } from "react";

interface CompanyFormProps {
  onSubmit: (company: { name: string; logo: File | null; bio: string }) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, logo, bio });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-gray-700 font-semibold">
          Company Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="logo" className="block text-gray-700 font-semibold">
          Company Logo
        </label>
        <input
          type="file"
          id="logo"
          onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
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

export default CompanyForm;
