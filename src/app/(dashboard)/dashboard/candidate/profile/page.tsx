"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ButtonComp from "@/app/components/ButtonComp";
import {
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { styles } from "@/app/styles";
import FileDisplay from "@/app/components/FileDisplay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect } from "react";
import { fetchCandidate } from "@/app/context/slices/candidateSlice";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const candidate = useSelector(
    (state: RootState) => state.candidateState.candidate
  );

  useEffect(() => {
    dispatch(fetchCandidate());
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-textTitle h-16 lg:h-auto">
            My Profile
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 md:p-6 mb-4 md:mb-6 relative">
          <div className="flex justify-between">
            <div
              className="absolute top-0 left-0 w-full h-24 bg-cover bg-center rounded-t-2xl"
              style={{
                backgroundImage: "url('/img/background-candidate.png')",
              }}
            >
            </div>
          </div>
          <div className="flex items-center space-x-4 relative z-10 mt-12">
            <FileDisplay
              modelName="userProfileImage"
              userId={candidate?.user?.id || ""}
              width={90}
              height={90}
              className="profile-image-style overflow-hidden"
              fallbackImage={candidate?.user?.photo || ""}
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{`${candidate?.firstName} ${candidate?.lastName}`}</h3>
              <span className="mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                {`${candidate?.user?.city}, ${candidate?.user?.province} `}
              </span>
            </div>
            
            <div className="absolute top-2 right-2">
              <ButtonComp
                text="Edit Profile"
                IsWhite={true}
                onClick={() => {
                  router.push("/dashboard/candidate/profile/edit");
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <div className="flex justify-between">
            <h4 className={styles.sectionHeadText}>About Me</h4>
          </div>
          <p className="text-gray-700">
            {candidate?.bio || "No bio available"}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <div className="flex justify-between">
            <h4 className="font-semibold">Experiences</h4>
          </div>
          <div className="mt-4 space-y-4">
            {candidate?.workExperience?.map((exp) => (
              <div key={exp.id} className="flex items-start gap-4">
                <div>
                  <h5 className="font-bold">{exp.position}</h5>
                  <p className="text-sm text-gray-500">
                    {exp.company} - {exp.country}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate
                      ? new Date(exp.startDate).toLocaleDateString()
                      : ""}{" "}
                    -{" "}
                    {exp.current
                      ? "Present"
                      : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : ""}
                  </p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <div className="flex justify-between">
            <h4 className="font-semibold">Education</h4>
          </div>
          <div className="mt-4 space-y-4">
            {candidate?.education?.map((edu) => (
              <div key={edu.id} className="flex items-start gap-4">
                <div>
                  <h5 className="font-bold">{edu.institution}</h5>
                  <p className="text-sm text-gray-500">{edu.degree}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate
                      ? new Date(edu.startDate).toLocaleDateString()
                      : ""}{" "}
                    -{" "}
                    {edu.current
                      ? "Present"
                      : edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString()
                      : ""}
                  </p>
                  <p className="text-gray-700">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h4 className="font-semibold">Skills</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidate?.skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h4 className="font-semibold">Languages</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidate?.languages?.map((lang) => (
              <span
                key={lang.id}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
              >
                {lang.name} - {lang.level}
              </span>
            ))}
          </div>
        </div>
      </div>
      <aside className="w-1/4 p-6">
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h4 className="font-semibold mb-4">Additional Details</h4>
          <p className="text-sm">
            <strong>Email:</strong> {candidate?.user?.email}
          </p>
          <p className="text-sm">
            <strong>Website:</strong>{" "}
            {candidate?.user?.website || ""}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h4 className="font-semibold mb-4">Social Links</h4>
          <div className="text-sm flex flex-row gap-2">
            <FaTwitter className="text-gray-600" />
            <div>
              <h1 className="text-gray-600">Twitter</h1>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                {candidate?.user?.twitter || ""}
              </a>
            </div>
          </div>
          <div className="text-sm flex flex-row gap-2">
            <FaLinkedinIn className="text-gray-600" />
            <div>
              <h1 className="text-gray-600">Linkedin</h1>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                {candidate?.user?.linkedIn || ""}
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfilePage;