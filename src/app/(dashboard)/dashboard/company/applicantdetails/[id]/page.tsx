"use client";
import { useEffect } from "react";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import { styles } from "@/app/styles";
import {
  FaUser,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaPhone,
} from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import ButtonComp from "@/app/components/ButtonComp";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { fetchApplicationById } from "@/app/context/slices/applicationByIdSlices";
import { useParams } from "next/navigation";

const candidateData = {
  fullName: "Jerome Bell",
  email: "jeromeBell45@gmail.com",
  phone: "+44 1245 572 135",
  socialLinks: {
    instagram: "instagram.com/jeromebell",
    twitter: "twitter.com/jeromebell",
    website: "www.jeromebell.com",
  },
  appliedJobs: {
    date: "2 days ago",
    title: "Product Development",
    type: "Marketing • Full-Time",
  },
  personalInfo: {
    language: "English, French, Bahasa",
    address: "4517 Washington Ave.\nManchester, Kentucky 39495",
  },
  professionalInfo: {
    about: [
      "I am a product designer - filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I am passionate about designing digital products that have a positive impact on the world.",
      "For 10 years, I have specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
    ],
    currentJob: "Product Designer",
    experience: "4 Years",
    qualification: "Bachelors in Engineering",
    skills: ["Project Management", "Copywriting", "English"],
  },
};

const ApplicantDetailsPage = () => {
  const params = useParams();
  const applicationId = params?.id as string;

  const dispatch = useDispatch<AppDispatch>();
  const application = useSelector((state: RootState) => state.applicationById);

  useEffect(() => {
    dispatch(fetchApplicationById(applicationId));
  }, [dispatch, applicationId ]);

  console.log("**************Application:", application);

  const {
    fullName,
    email,
    phone,
    socialLinks,
    appliedJobs,
    personalInfo,
    professionalInfo,
  } = candidateData;

  return (
    <>
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight} />
      <Link href="/dashboard/company/jobApplication">
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
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{fullName}</h3>
             
            </div>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800">
              Applied Jobs
            </h4>
            <p className="text-gray-600">{appliedJobs.date}</p>
            <div className="mt-2">
              <h5 className="font-medium text-gray-800">{appliedJobs.title}</h5>
              <p className="text-sm text-gray-600">{appliedJobs.type}</p>
            </div>
          </div>

          <div className="pb-4 border-b border-gray-400 flex items-center justify-center">
            
            <ButtonComp text="Interview" IsWhite={true} width="w-full"/* onClick={() => router.push("/dashboard/company/applicantdetails")} */ />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <FaEnvelope />
                {email}
              </li>
              <li className="flex items-center gap-2">
                <FaPhone />
                {phone}
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram />
                {socialLinks.instagram}
              </li>
              <li className="flex items-center gap-2">
                <FaTwitter />
                {socialLinks.twitter}
              </li>
              <li className="flex items-center gap-2">
                <FaGlobe />
                {socialLinks.website}
              </li>
            </ul>
          </div>
        </div>

        <div className="md:basis-2/3 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="border-b border-gray-400 pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Info
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                <p className="text-gray-800">{fullName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Language</h4>
                <p className="text-gray-800">{personalInfo.language}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Address</h4>
                <p className="text-gray-800 whitespace-pre-line">
                  {personalInfo.address}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Professional Info
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">About Me</h3>
                {professionalInfo.about.map((text, i) => (
                  <p key={i} className="text-gray-600 mt-1">
                    {text}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Current Job
                  </h3>
                  <p className="text-gray-800">{professionalInfo.currentJob}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Experience
                  </h3>
                  <p className="text-gray-800">{professionalInfo.experience}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Qualification
                  </h3>
                  <p className="text-gray-800">
                    {professionalInfo.qualification}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Skills</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {professionalInfo.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetailsPage;
