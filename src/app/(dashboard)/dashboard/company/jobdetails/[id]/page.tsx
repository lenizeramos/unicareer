"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { GoArrowLeft } from "react-icons/go";
import { styles } from "@/app/styles";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { IJob } from "@/app/Types/index";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaRegClock,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { Chip } from "primereact/chip";
import Badge from "@/app/components/Badge";

const JobDetailsPage = () => {
  const toast = useRef<Toast>(null);
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
            `http://localhost:3000/api/job/${jobId}`
          );
          if (!response.ok) throw new Error("Failed to fetch application data");
          const job = await response.json();
          console.log(job, "job");
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight} />
      <Link
        href="/dashboard/company/joblisting"
        className="hover:opacity-80 transition-opacity inline-block mb-6"
      >
        <div className="flex items-center text-xl space-x-2">
          <GoArrowLeft className="text-lg" />
          <p>Back to Jobs</p>
        </div>
      </Link>
      <div className="mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {job.title}
                </h1>
              </div>
              {
                <div className="flex items-center gap-4">
                  <Badge status={job.status} color={job.status.toLowerCase()} />
                </div>
              }
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaBriefcase className="mr-2 text-gray-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiLayers className="mr-2 text-gray-500" />
              <span>{job.level}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaMoneyBillWave className="mr-2 text-gray-500" />
              <span>
                ${job.salaryMin} - ${job.salaryMax}
              </span>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Job Description
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.description}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Responsibilities
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.responsibilities}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Who You Are
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.whoYouAre}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Nice to Have
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.niceToHave}
                  </p>
                </section>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <section className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          className="bg-blue-100 text-blue-800"
                        />
                      ))}
                    </div>
                  </section>

                  <section className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <FaCalendarAlt className="mr-2 text-gray-500" />
                      <span>Posted: {formatDate(job.createdAt)}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaRegClock className="mr-2 text-gray-500" />
                      <span>Closes: {formatDate(job.closingDate)}</span>
                    </div>
                  </section>
                  <section className="mt-8 pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3">Actions</h3>
                    <div className="flex flex-row justify-between items-center">
                      
                      <button className="text-red-600 hover:underline">
                        Edit Job
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete Job
                      </button>
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
