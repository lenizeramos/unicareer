import React, { useState } from 'react';

interface CompanyFormProps {
  onSubmit: (formData: { companyName: string; industry: string; logo: File | null }) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit }) => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [logo, setLogo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ companyName, industry, logo });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4">
      <div>
        <label htmlFor="companyName" className="block text-gray-700 font-semibold">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-gray-700 font-semibold">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
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
