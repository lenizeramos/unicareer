"use client";

type ApplicantType = {
  label: string;
  count: number;
  color: string;
};

const applicants: ApplicantType[] = [
  { label: "Full Time", count: 45, color: "bg-purple-500" },
  { label: "Part-Time", count: 24, color: "bg-green-500" },
  { label: "Remote", count: 22, color: "bg-blue-500" },
  { label: "Internship", count: 32, color: "bg-yellow-500" },
  { label: "Contract", count: 30, color: "bg-red-500" },
];

const totalApplicants = 67;

export default function ApplicantsSummary() {
  return (
    <div className="p-6 w-96 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">
        Applicants Summary
      </h3>
      <div className="mt-4">
        <span className="text-4xl font-bold text-gray-900">
          {totalApplicants}
        </span>
        <span className="text-lg text-gray-500"> Applicants</span>
      </div>
      <div className="mt-4 flex w-full h-2 rounded bg-gray-200 overflow-hidden">
        {applicants.map((applicant) => (
          <div
            key={applicant.label}
            className={`${applicant.color} h-full`}
            style={{ width: `${(applicant.count / totalApplicants) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {applicants.map((applicant) => (
          <div key={applicant.label} className="flex items-center space-x-2">
            <span className={`w-4 h-4 ${applicant.color} rounded`}></span>
            <span className="text-gray-700 text-sm">
              {applicant.label} : <strong>{applicant.count}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
