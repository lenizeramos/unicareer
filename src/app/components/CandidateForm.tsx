import React, { useState } from 'react';

interface CandidateFormProps {
  onSubmit: (formData: { firstName: string; lastName: string; photo: File | null }) => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, photo });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-gray-700 font-semibold">
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
