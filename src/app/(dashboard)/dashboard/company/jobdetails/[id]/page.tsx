"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { GoArrowLeft } from "react-icons/go";
import { styles } from "@/app/styles";
import { IJob } from "@/app/Types/index";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaRegClock,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { Chip } from "primereact/chip";
import Badge from "@/app/components/Badge";
import EditJobButton from "@/app/components/EditJobButton";
import { toast } from "sonner";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import DeleteJobButton from "@/app/components/DeleteJobButton";

const JobDetailsPage = () => {
  const toastReact = useRef<Toast>(null);
  const params = useParams();
  const jobId = params?.id as string;
  const [job, setJob] = useState<IJob>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      const fetchJobById = async (jobId: string) => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/job/${jobId}`
          );
          if (!response.ok) throw new Error("Failed to fetch application data");
          const job = await response.json();

          setJob(job);
        } catch (error) {
          console.error("Error fetching application:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      };
      fetchJobById(jobId);
    }
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        Job not found
      </div>
    );
  }

  const formatDate = (dateInput?: string | Date | null) => {
    if (!dateInput) return "N/A";
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpdateClosingDate = async (newClosingDate: Date) => {
    try {
      const response = await fetch(`/api/job/${jobId}/update-closing-date`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ closingDate: newClosingDate }),
      });

      if (!response.ok) throw new Error("Failed to update closing date");

      setJob((prev) =>
        prev ? { ...prev, closingDate: newClosingDate } : prev
      );

      toast.success("Closing date updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  return (
    <>
      <Toast ref={toastReact} />
      <ConfirmDialog />

      <CompanyHeaderPaymentButton isDashboard={false} pageName="Job Details" />
      <div className={styles.borderBottomLight} />

      <Link
          href="/dashboard/company/joblisting"
          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-6 px-4 pt-8"
        >
          <GoArrowLeft className="text-xl mr-2" />
          <span className="text-xl font-semibold font-monomakh">Back to Jobs</span>
        </Link>
      <div className="mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-800 font-monomakh">{job.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <FaUser className="w-5 h-5" />
                <span className="text-2xl font-extrabold text-gray-600">
                  {job.totalApplications}
                </span>
                <span className="text-lg text-gray-500 font-shafarik">Applications</span>
              </div>
              {job.status && (
                <div className="flex items-center gap-4">
                  <Badge status={job.status} color={job.status.toLowerCase()} />
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="text-lg font-shafarik">{job.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaBriefcase className="mr-2 text-gray-500" />
              <span className="text-lg font-shafarik">{job.type}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiLayers className="mr-2 text-gray-500" />
              <span className="text-lg font-shafarik">{job.level}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaMoneyBillWave className="mr-2 text-gray-500" />
              <span className="text-lg font-shafarik">
                ${job.salaryMin} - ${job.salaryMax}
              </span>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 font-monomakh">
                    Job Description
                  </h2>
                  <p className="text-lg text-gray-700 whitespace-pre-line font-shafarik">
                    {job.description}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 font-monomakh">
                    Responsibilities
                  </h2>
                  <p className="text-lg text-gray-700 whitespace-pre-line font-shafarik">
                    {job.responsibilities}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 font-monomakh">
                    Who You Are
                  </h2>
                  <p className="text-lg text-gray-700 whitespace-pre-line font-shafarik">
                    {job.whoYouAre}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 font-monomakh">
                    Nice to Have
                  </h2>
                  <p className="text-lg text-gray-700 whitespace-pre-line font-shafarik">
                    {job.niceToHave}
                  </p>
                </section>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <section className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3 font-monomakh">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills?.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          className="bg-blue-100 text-blue-800 font-shafarik"
                        />
                      ))}
                    </div>
                  </section>

                  <section className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3 font-monomakh">Benefits</h3>
                    <ul className="space-y-2">
                      {job.benefits?.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-gray-700 font-shafarik">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center text-gray-700 font-shafarik">
                      <FaCalendarAlt className="mr-2 text-gray-500" />
                      <span>Posted: {formatDate(job.createdAt)}</span>
                    </div>
                    <div className="flex items-center text-gray-700 font-shafarik">
                      <FaRegClock className="mr-2 text-gray-500" />
                      <span>Closes: {formatDate(job.closingDate)}</span>
                    </div>
                  </section>

                  <section className="mt-8 pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3 font-monomakh">Actions</h3>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <EditJobButton
                        jobApplications={job.totalApplications ?? 0}
                        jobData={job}
                        onUpdateClosingDate={handleUpdateClosingDate}
                      />
                      {job.id && (
                        <DeleteJobButton jobId={job.id} label={"Delete"} />
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
