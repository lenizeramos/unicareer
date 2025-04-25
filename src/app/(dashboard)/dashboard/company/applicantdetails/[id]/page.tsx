"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import {
  FaUser,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { styles } from "@/app/styles";
import { InfoSectionProps, InfoItemProps } from "@/app/Types";
import ContactInfoItem from "@/app/components/ContactInfoItem";
import { IApplication } from "@/app/Types/slices";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ApplicationStatusButton from "@/app/components/ApplicationStatusButton";

const InfoSection = ({ title, children, className = "" }: InfoSectionProps) => (
  <div className={`pb-4 border-b border-gray-400 ${className}`}>
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div>
    <h4 className="text-sm font-medium text-gray-500">{label}</h4>
    {typeof value === "string" || typeof value === "number" ? (
      <p className="text-gray-800">{value || "N/A"}</p>
    ) : (
      value || <p className="text-gray-800">N/A</p>
    )}
  </div>
);

const applicationStatusOptions = [
  { label: "Mark as Pending", status: "PENDING" },
  { label: "Interview", status: "INTERVIEWED" },
  { label: "Reject", status: "REJECTED" },
  { label: "Hire", status: "HIRED" },
];

const ApplicantDetailsPage = () => {
  const toast = useRef<Toast>(null);
  const params = useParams();
  const applicationId = params?.id as string;
  const [application, setApplication] = useState<IApplication>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (applicationId) {
      const fetchApplicationById = async (applicationId: string) => {
        try {
          setLoading(true);
          const response = await fetch(`/api/application/${applicationId}`);
          if (!response.ok) throw new Error("Failed to fetch application data");
          const application = await response.json();

          setApplication(application);
          setStatus(application.status);
        } catch (error) {
          console.error("Error fetching application:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      };
      fetchApplicationById(applicationId);
    }
  }, [applicationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const candidate = application?.candidate;
  const user = candidate?.user;

  console.log(candidate, "CANDIDAETTTTTTTTTTTTTTTTTTTT");
  console.log(user, "userrrrrrrrrrrrrrrrrrrrrrrrrTT");

  const capitalize = (str: string | undefined) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const education = candidate?.education?.[0];
  const workExperience = candidate?.workExperience?.[0];
  const job = application?.job;
  const fullName = `${capitalize(candidate?.firstName)} ${capitalize(
    candidate?.lastName
  )}`.trim();
  const qualification = education
    ? `${capitalize(education.degree)} in ${capitalize(education.fieldOfStudy)}`
    : "N/A";

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight} />

      <Link
        href="/dashboard/company/jobapplication"
        className="hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center text-2xl space-x-2 pt-4 pb-4">
          <GoArrowLeft className="text-xl" />
          <p>Applicant Details</p>
        </div>
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:basis-1/3 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-400 pb-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{fullName}</h3>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800">Application</h4>
            <p className="text-gray-600">
              {application?.appliedAt
                ? new Date(application.appliedAt).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="mt-2">
              <h5 className="font-medium text-gray-800">{`${capitalize(
                job?.title
              )}`}</h5>
              <p className="text-sm text-gray-600">
                {`${capitalize(
                  Array.isArray(job?.categories)
                    ? job.categories.join(", ")
                    : job?.categories
                )}`}{" "}
                - {`${capitalize(job?.type)}`}
              </p>
            </div>
          </div>
          <div className="pb-4 border-b border-gray-400 flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applicationStatusOptions.map((option) => (
                <ApplicationStatusButton
                  key={option.status}
                  applicationId={applicationId}
                  currentStatus={status || ""}
                  targetStatus={option.status}
                  label={option.label}
                  setStatus={setStatus}
                />
              ))}
            </div>
          </div>

          <InfoSection title="Contact">
            <ul className="space-y-3 text-sm text-gray-700">
              {user?.email && (
                <ContactInfoItem
                  icon={<FaEnvelope />}
                  value={user?.email || ""}
                />
              )}
              {user?.linkedIn && (
                <ContactInfoItem
                  icon={<FaLinkedin />}
                  value={user?.linkedIn || ""}
                />
              )}
              {user?.twitter && (
                <ContactInfoItem
                  icon={<FaTwitter />}
                  value={user?.twitter || ""}
                />
              )}
              {user?.website && (
                <ContactInfoItem
                  icon={<FaGlobe />}
                  value={user?.website || ""}
                />
              )}
            </ul>
          </InfoSection>
        </div>

        <div className="md:basis-2/3 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
          <InfoSection title="Personal Info">
            <div className="space-y-4">
              <InfoItem label="Full Name" value={fullName} />
              
              {candidate?.languages?.length && <InfoItem
                label="Language"
                value={
                  candidate.languages.map((lang, index) => (
                        <span key={index} className="mr-2">
                          {capitalize(lang.name) + " - " + capitalize(lang.level) || ""}<br/>
                        </span>
                      ))
                }
              />}
              
              {user?.city && (
                <InfoItem
                  label="City"
                  value={
                    <span className="whitespace-pre-line">{user.city}</span>
                  }
                />
              )}
            </div>
          </InfoSection>

          <InfoSection title="Professional Info" className="border-none">
            <div className="space-y-4">
              <InfoItem
                label="About Me"
                value={
                  candidate?.bio && (
                    <p className="text-gray-600 mt-1">{candidate.bio}</p>
                  )
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <InfoItem
                  label="Current Job"
                  value={workExperience?.position}
                />
                <InfoItem label="Qualification" value={qualification} />

                <div className="md:col-span-2">
                  <InfoItem
                    label="Skills"
                    value={
                      candidate?.skills?.length ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : null
                    }
                  />
                </div>
              </div>
            </div>
          </InfoSection>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetailsPage;
