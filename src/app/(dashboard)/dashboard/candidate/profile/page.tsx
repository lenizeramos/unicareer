import React from "react";
import Image from "next/image";
import ButtonComp from "@/app/components/ButtonComp";
import { FaRegEdit, FaPlus, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import { styles } from "@/app/styles";
import { FiFlag } from "react-icons/fi";
import PortfolioSlider from "@/app/components/PortfolioSlider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const session = await auth();

    if (!session?.userId) {
        redirect("/sign-in");
    }

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
                        <div className="w-24 h-24 bg-blue-500 rounded-full flex justify-center items-center border-4 border-white">
                            <Image
                                src="/img/jake.png"
                                alt="Profile Picture"
                                width={24}
                                height={24}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">Jake Gyll</h3>
                            <p className="text-sm text-gray-500">Product Designer at Twitter</p>
                            <p className="text-sm text-gray-500">Manchester, UK</p>
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
                    <p className="text-gray-700">
                        I’m a product designer - filmmaker currently working remotely at Twitter from beautiful
                        Manchester, United Kingdom. I’m passionate about designing digital products that have a positive
                        impact on the world.
                    </p>
                    <p className="text-gray-700 mt-4">
                        For 10 years, I’ve specialised in interface, experience & interaction design as well as working
                        in user research and product strategy for product agencies, big tech companies & start-ups.
                    </p>
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
                        <div className="flex items-start gap-4">
                            <Image
                                src="/img/twitter.png"
                                alt="Twitter Logo"
                                width={24}
                                height={24}
                                className="w-8 h-8"
                            />
                            <div>
                                <h5 className="font-bold">Product Designer</h5>
                                <p className="text-sm text-gray-500">Twitter - Full-Time</p>
                                <p className="text-sm text-gray-500">Jun 2019 - Present (1y 1m)</p>
                                <p className="text-gray-700">
                                    Created and executed social media plans for 10 brands utilizing multiple features
                                    and content types to increase brand outreach, engagement, and leads.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Image
                                src="/img/godaddy.png"
                                alt="GoDaddy Logo"
                                width={24}
                                height={24}
                                className="w-8 h-8"
                            />
                            <div>
                                <h5 className="font-bold">Growth Marketing Designer</h5>
                                <p className="text-sm text-gray-500">GoDaddy - Full-Time</p>
                                <p className="text-sm text-gray-500">Apr 2018 - May 2019 (1y 1m)</p>
                                <p className="text-gray-700">
                                    Developed marketing strategies, advertisements, protocols, contests, and procedures
                                    to cater clients.
                                </p>
                            </div>
                        </div>
                        <button className="mt-2 text-sm text-blue-500">Show 3 more experiences</button>
                    </div>
                </div>

                {/* Educations */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <div className="flex justify-between">
                        <h4 className="font-semibold">Educations</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                            <FaPlus size={16} />
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-start gap-4">
                            <Image
                                src="/img/harvard.png"
                                alt="Harvard Logo"
                                width={24}
                                height={24}
                                className="w-8 h-8"
                            />
                            <div>
                                <h5 className="font-bold">Harvard University</h5>
                                <p className="text-sm text-gray-500">Psychology Degree - Applied Psychology</p>
                                <p className="text-sm text-gray-500">2010 - 2014</p>
                                <p className="text-gray-700">
                                    As a lead psychologist in the field of Consumer and Society, I am experienced in
                                    improving human experiences by observing, analyzing, and designing impactful
                                    solutions.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Image
                                src="/img/toronto.png"
                                alt="University of Toronto Logo"
                                width={24}
                                height={24}
                                className="w-8 h-8"
                            />
                            <div>
                                <h5 className="font-bold">University of Toronto</h5>
                                <p className="text-sm text-gray-500">BSc in Communication</p>
                                <p className="text-sm text-gray-500">2006 - 2010</p>
                            </div>
                        </div>
                        <button className="mt-2 text-sm text-blue-500">Show 2 more educations</button>
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold">Skills</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {["Communication", "Analytics", "Facebook Ads", "Content Planning", "Community Manager"].map(
                            (skill) => (
                                <span key={skill} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                                    {skill}
                                </span>
                            )
                        )}
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
                        <strong>Email:</strong> jakegyll@email.com
                    </p>
                    <p className="text-sm">
                        <strong>Phone:</strong> +44 1245 572 135
                    </p>
                    <p className="text-sm">
                        <strong>Languages:</strong> English, French
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
