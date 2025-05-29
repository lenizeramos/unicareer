"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import {
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
import FileDisplay from "@/app/components/FileDisplay";
import Loader from "@/app/components/Loader";

const InfoSection = ({ title, children, className = "" }: InfoSectionProps) => (
  <div className={`bg-white shadow rounded-lg p-6 mb-6 ${className} font-monomakh`}>
    <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">{title}</h2>
    {children}
  </div>
);

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="mb-4">
    <h4 className="text-sm font-medium text-gray-600 mb-1 font-shafarik">{label}</h4>
    {typeof value === "string" || typeof value === "number" ? (
      <p className="text-gray-800 font-medium font-shafarik">{value || "N/A"}</p>
    ) : (
      value || <p className="text-gray-800 font-medium font-shafarik">N/A</p>
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
          const response = await fetch(
            `/api/application/${applicationId}`
          );
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
    return <Loader />;
  }

  const candidate = application?.candidate;
  const user = candidate?.user;

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
    <div className="min-h-screen">
      <Toast ref={toast} />
      <ConfirmDialog />

      <CompanyHeaderPaymentButton isDashboard={false} pageName="Applicant Details" />
      <div className={styles.borderBottomLight} />

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard/company/jobapplication"
          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-6"
        >
          <GoArrowLeft className="text-xl mr-2" />
          <span className="text-xl font-semibold font-monomakh">Applicant Details</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                  <FileDisplay
                    modelName="userProfileImage"
                    userId={candidate?.user?.id || ""}
                    width={90}
                    height={90}
                    className="w-full h-full object-cover"
                    fallbackImage={candidate?.user?.photo || ""}
                  />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 font-monomakh">{fullName}</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 my-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 font-monomakh">Application Details</h4>
                <p className="text-gray-600 text-sm mb-3 font-shafarik">
                  Applied on: {application?.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : "N/A"}
                </p>
                <div className="space-y-1">
                  <h5 className="font-medium text-gray-800 font-shafarik">{capitalize(job?.title)}</h5>
                  <p className="text-sm text-gray-600 font-shafarik">
                    {capitalize(Array.isArray(job?.categories) ? job.categories.join(", ") : job?.categories)} - {capitalize(job?.type)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {applicationStatusOptions.map((option) => (
                  <ApplicationStatusButton
                    key={option.status}
                    applicationId={applicationId}
                    currentStatus={status || ""}
                    targetStatus={option.status}
                    label={option.label}
                    setStatus={setStatus}
                    className="w-full transition-colors duration-300"
                  />
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 font-monomakh">Contact Information</h4>
                <ul className="space-y-3">
                  {user?.email && (
                    <ContactInfoItem
                      icon={<FaEnvelope className="text-gray-600 font-shafarik" />}
                      value={user?.email}
                      className="hover:text-blue-600 transition-colors duration-300 font-shafarik"
                    />
                  )}
                  {user?.linkedIn && (
                    <ContactInfoItem
                      icon={<FaLinkedin className="text-gray-600" />}
                      value={user?.linkedIn}
                      className="hover:text-blue-600 transition-colors duration-300 font-shafarik"
                    />
                  )}
                  {user?.twitter && (
                    <ContactInfoItem
                      icon={<FaTwitter className="text-gray-600" />}
                      value={user?.twitter}
                      className="hover:text-blue-600 transition-colors duration-300 font-shafarik"
                    />
                  )}
                  {user?.website && (
                    <ContactInfoItem
                      icon={<FaGlobe className="text-gray-600" />}
                      value={user?.website}
                      className="hover:text-blue-600 transition-colors duration-300 font-shafarik"
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 space-y-6">
            <InfoSection title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Full Name" value={fullName} />
                {candidate?.languages?.length && (
                  <InfoItem
                    label="Languages"
                    value={
                      <div className="space-y-1">
                        {candidate.languages.map((lang, index) => (
                          <span key={index} className="block text-gray-700 font-shafarik">
                            {capitalize(lang.name)} - {capitalize(lang.level)}
                          </span>
                        ))}
                      </div>
                    }
                  />
                )}
                {user?.city && (
                  <InfoItem
                    label="Address"
                    value={
                      <span className="whitespace-pre-line font-shafarik">{user.city}, {user.province}</span>
                    }
                  />
                )}
              </div>
            </InfoSection>

            <InfoSection title="Professional Information">
              <InfoItem
                label="About"
                value={
                  candidate?.bio && (
                    <p className="text-gray-700 leading-relaxed font-shafarik">{candidate.bio}</p>
                  )
                }
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <InfoItem label="Current Position" value={workExperience?.position} />
                <InfoItem label="Qualification" value={qualification} />
                
                <div className="md:col-span-2">
                  <InfoItem
                    label="Skills"
                    value={
                      candidate?.skills?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200 transition-colors duration-300 font-shafarik"
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
            </InfoSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsPage;
