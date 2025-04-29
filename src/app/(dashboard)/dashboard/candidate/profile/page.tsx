"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ButtonComp from "@/app/components/ButtonComp";
import { FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { styles } from "@/app/styles";
import FileDisplay from "@/app/components/FileDisplay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect } from "react";
import { fetchCandidate } from "@/app/context/slices/candidateSlice";
import DashboardNavbar from "@/app/components/DashboardNavbar";

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
    <>
      <DashboardNavbar
        title="My Profile"
        button={{ text: "Back to dashboard", IsWhite: true }}
      />
      <div className="flex flex-col md:flex-row gap-4 font-shafarik">
        <div className="flex flex-col md:w-2/3 gap-6 md:p-6">
          <div className="p-4 md:p-6 relative shadow-xl rounded-2xl">
            <div
              className="absolute top-0 left-0 w-full md:h-24 h-18 bg-cover bg-center rounded-t-2xl"
              style={{
                backgroundImage: "url('/img/background-candidate.png')",
              }}
            />
            <div className="flex items-center md:gap-4 gap-1 relative z-10 mt-8">
              <FileDisplay
                modelName="userProfileImage"
                userId={candidate?.user?.id || ""}
                width={90}
                height={90}
                className="profile-image-style overflow-hidden"
                fallbackImage={candidate?.user?.photo || ""}
              />
              <div className="flex flex-col flex-1">
                <h3 className="md:text-3xl text-lg font-bold font-monomakh">{`${candidate?.firstName} ${candidate?.lastName}`}</h3>
                {candidate?.user?.city && (
                  <span className="px-2 py-1 bg-gray-100 text-[#49286b] md:text-base text-[10px] rounded-full font-shafarik w-fit">
                    {candidate.user.city && `${candidate.user.city}`}{" "}
                    {candidate.user.province && `, ${candidate.user.province}`}
                  </span>
                )}
              </div>

              <div className="">
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

          <div className="p-6 w-full border border-gray-200">
            <h4 className={`${styles.sectionHeadText}`}>About Me</h4>
            <p className="text-gray-700 ">
              {candidate?.bio || "No bio available"}
            </p>
          </div>

          <div className="p-6 w-full border border-gray-200">
            <h4 className={`${styles.sectionHeadText}`}>Experiences</h4>
            <div className="mt-4 space-y-4">
              {candidate?.workExperience?.map((exp) => (
                <div key={exp.id} className="">
                  <div className="space-y-2">
                    <h5 className="font-bold md:text-xl">{exp.position}</h5>
                    <p className="text-sm text-gray-800">
                      {exp.company} - {exp.country}
                    </p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate &&
                        new Date(exp.startDate).toLocaleDateString()}{" "}
                      -{" "}
                      {!exp.current
                        ? "Present"
                        : exp.endDate &&
                          new Date(exp.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 w-full border border-gray-200">
            <h4 className={`${styles.sectionHeadText}`}>Education</h4>
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

          <div className="p-6 w-full border border-gray-200">
            <h4 className={`${styles.sectionHeadText}`}>Skills</h4>
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

          <div className="p-6 w-full border border-gray-200">
            <h4 className={`${styles.sectionHeadText}`}>Languages</h4>
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

        <aside className=" md:w-1/3 w-full bg-gray-50 space-y-5 md:mt-6 p-6 h-fit md:rounded-2xl">
          <div className="overflow-hidden text-ellipsis">
            <h4 className={`${styles.sectionHeadText} md:text-center mb-2`}>
              Additional Details
            </h4>
            <p className="text-sm">
              <strong className="text-gray-800">Email:</strong>{" "}
              {candidate?.user?.email}
            </p>
            {candidate?.user?.website && (
              <div className="text-sm">
                <div className="flex gap-2 items-center">
                  <FaGlobe className="text-gray-600" />
                  <h4 className="text-gray-800 font-semibold">Website</h4>{" "}
                </div>
                <a
                  className=" text-blue-600 hover:underline cursor-pointer"
                  href={`${candidate.user.website}`}
                  target="_blank"
                >
                  {candidate.user.website || ""}
                </a>
              </div>
            )}
          </div>

          <div className="truncate overflow-hidden text-ellipsis">
            <h4 className={`${styles.sectionHeadText} mb-2`}>Social Links</h4>
            <div className="text-sm gap-2">
              <div className="flex gap-2 items-center">
                <FaSquareXTwitter />
                <h4 className="text-gray-800 font-semibold">X</h4>{" "}
              </div>
              <a
                href={`${candidate?.user?.twitter}`}
                className="text-blue-600 hover:underline cursor-pointer"
                target="_blank"
              >
                {candidate?.user?.twitter || ""}
              </a>
            </div>
            <div className="text-sm">
              <div className=" flex gap-2 items-center">
                <IoLogoLinkedin className="text-blue-500" />
                <h4 className="text-gray-800 font-semibold">Linkedin</h4>{" "}
              </div>
              <a
                href={`${candidate?.user?.linkedIn}`}
                className="text-blue-600 hover:underline cursor-pointer"
                target="_blank"
              >
                {candidate?.user?.linkedIn || ""}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default ProfilePage;
