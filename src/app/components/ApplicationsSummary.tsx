"use client";
import { ITotalApplicationProps } from "../Types";

export default function ApplicationsSummary({
  applications,
  totalApplications,
}: ITotalApplicationProps) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800">
        Applications Summary
      </h3>
      <div className="mt-4 flex items-center">
        <span className="text-xl font-bold text-gray-800 font-bigShoulderStencil">
          {totalApplications}
        </span>
        <span className="text-lg text-gray-700 ml-1"> Applications</span>
      </div>
      <div className="mt-4 flex w-full h-2 rounded bg-gray-200 overflow-hidden">
        {applications.map((application) => (
          <div
            key={application.label}
            className={`background-${application.label.toLowerCase()} h-full`}
            style={{
              width: `${(application.count / totalApplications) * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {applications.map((application) => (
          <div key={application.label} className="flex items-center space-x-2">
            <span
              className={`w-4 h-4 background-${application.label.toLowerCase()} rounded`}
            ></span>
            <span className="text-gray-700 text-sm">
              {application.label} : <strong className="font-bigShoulderStencil">{application.count}</strong>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
