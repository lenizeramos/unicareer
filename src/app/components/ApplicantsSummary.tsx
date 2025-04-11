"use client";
import { ITotalApplicantProps } from "../Types";

export default function ApplicantsSummary({
  applicants,
  totalApplicants,
}: ITotalApplicantProps) {
  return (
    <>
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
            className={`background-${applicant.label.toLowerCase()} h-full`}
            style={{ width: `${(applicant.count / totalApplicants) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {applicants.map((applicant) => (
          <div key={applicant.label} className="flex items-center space-x-2">
            <span className={`w-4 h-4 background-${applicant.label.toLowerCase()} rounded`}></span>
            <span className="text-gray-700 text-sm">
              {applicant.label} : <strong>{applicant.count}</strong>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
