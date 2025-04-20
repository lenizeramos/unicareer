import React from "react";
import Image from "next/image";
import ButtonComp from "@/app/components/ButtonComp";
import { FaRegEdit, FaPlus, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import { styles } from "@/app/styles";
import { FiFlag } from "react-icons/fi";
import PortfolioSlider from "@/app/components/PortfolioSlider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCandidateProfile } from "@/Lib/server/usersService";
import FileDisplay from "@/app/components/FileDisplay";

const ProfilePage = async () => {
    const session = await auth();

    if (!session?.userId) {
        redirect("/sign-in");
    }

    const userData = await getCandidateProfile(session.userId);
    if (!userData?.candidate) {
        redirect("/register");
    }

    const { candidate } = userData;
    
    return (
        <div className="flex flex-col sm:flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
                    <h2 className="text-3xl font-bold flex items-center gap-2 text-textTitle h-16 lg:h-auto">
                        My Profile
                    </h2>
                    <ButtonComp text="Back to HomePage" IsWhite={true} />
                </header>

                {/* Profile Card */}
                <div className="bg-white shadow-md rounded-2xl p-4 md:p-6 mb-4 md:mb-6 relative">
                    <div className="flex justify-between">
                        <div
                            className="absolute top-0 left-0 w-full h-24 bg-cover bg-center rounded-t-2xl"
                            style={{ backgroundImage: "url('/img/background-candidate.png')" }}
                        >
                            <button
                                className={`${styles.iconsCards} absolute top-2 right-2 text-white size={30} hover:text-gray-600`}
                            >
                                <FaRegEdit />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 relative z-10 mt-12">
                            <FileDisplay
                                modelName="userProfileImage"
                                userId={userData.id}
                                width={90}
                                height={90}
                                className="profile-image-style overflow-hidden"
                                fallbackImage={userData.photo || ''}
                            />  
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">{`${candidate.firstName} ${candidate.lastName}`}</h3>
                            <button className="mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                                <FiFlag /> OPEN FOR OPPORTUNITIES
                            </button>
                        </div>
                        <div className="absolute top-2 right-2">
                            <ButtonComp text="Edit Profile" IsWhite={true} />
                        </div>
                    </div>
                </div>

                {/* About Me */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <div className="flex justify-between">
                        <h4 className={styles.sectionHeadText}>About Me</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                            <FaRegEdit size={16} />
                        </button>
                    </div>
                    <p className="text-gray-700">{candidate.bio || "No bio available"}</p>
                </div>

                {/* Experiences */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <div className="flex justify-between">
                        <h4 className="font-semibold">Experiences</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                            <FaPlus size={16} />
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {candidate.workExperience.map((exp) => (
                            <div key={exp.id} className="flex items-start gap-4">
                                <div>
                                    <h5 className="font-bold">{exp.position}</h5>
                                    <p className="text-sm text-gray-500">{exp.company} - {exp.country}</p>
                                    <p className="text-sm text-gray-500">
                                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} - {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString() : '')}
                                    </p>
                                    <p className="text-gray-700">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <div className="flex justify-between">
                        <h4 className="font-semibold">Education</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                            <FaPlus size={16} />
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {candidate.education.map((edu) => (
                            <div key={edu.id} className="flex items-start gap-4">
                                <div>
                                    <h5 className="font-bold">{edu.institution}</h5>
                                    <p className="text-sm text-gray-500">{edu.degree}</p>
                                    <p className="text-sm text-gray-500">
                                        {edu.startDate ? new Date(edu.startDate).toLocaleDateString() : ''} - {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '')}
                                    </p>
                                    <p className="text-gray-700">{edu.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold">Skills</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold">Languages</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {candidate.languages.map((lang) => (
                            <span key={lang.id} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                                {lang.name} - {lang.level}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Portfolios */}
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <PortfolioSlider />
                    </div>
                </div>
            </main>

            {/* Additional Details */}
            <aside className="w-1/4 p-6">
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold mb-4">Additional Details</h4>
                    <p className="text-sm">
                        <strong>Email:</strong> {userData.email}
                    </p>
                    <p className="text-sm">
                        <strong>Website:</strong> {candidate.website || 'Not provided'}
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h4 className="font-semibold mb-4">Social Links</h4>
                    <div className="text-sm flex flex-row gap-2">
                        <FaInstagram className="text-gray-600" />
                        <div>
                            <h1 className="text-gray-600">Instagram</h1>
                            <a href="https://instagram.com/jakegyll" className="text-blue-600 hover:underline">
                                instagram.com/jakegyll
                            </a>
                        </div>
                    </div>
                    <div className="text-sm flex flex-row gap-2">
                        <FaTwitter className="text-gray-600" />
                        <div>
                            <h1 className="text-gray-600">Instagram</h1>
                            <a href="https://twitter.com/jakegyll" className="text-blue-600 hover:underline">
                                twitter.com/jakegyll
                            </a>
                        </div>
                    </div>
                    <div className="text-sm flex flex-row gap-2">
                        <FaGlobe className="text-gray-600" />
                        <div>
                            <h1 className="text-gray-600">Website</h1>
                            <a href="https://www.jakegyll.com" className="text-blue-600 hover:underline">
                                www.jakegyll.com
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default ProfilePage;
