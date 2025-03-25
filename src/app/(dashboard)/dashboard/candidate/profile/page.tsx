import React from "react";
import Image from "next/image";
import { FaInstagram, FaTwitter, FaEdit } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Profile: React.FC = () => {
    return (
        <div className="flex gap-8 p-8">
            {/* Profile Info Section */}
            <div className="flex flex-col w-3/5">
                <div className="relative">
                    <Image src="/sample-profile.jpg" alt="Profile Picture" className="w-full h-auto" />
                    <div
                        className="absolute top-0 left-0 w-full h-40 bg-cover bg-center"
                        style={{ backgroundImage: "url(/sample-background.jpg)" }}
                    ></div>
                </div>
                <div className="p-6 bg-white shadow-lg mt-4">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-gray-500">Software Engineer</p>
                    <p className="text-gray-500">San Francisco, CA</p>
                    <div className="mt-4 bg-green-500 text-white p-2 rounded-lg inline-block">
                        OPEN FOR OPPORTUNITIES
                    </div>
                    <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* About Me Section */}
            <div className="w-2/5">
                <div className="bg-white p-6 shadow-lg mb-8">
                    <h3 className="text-xl font-semibold">About Me</h3>
                    <p>Detail about the candidate goes here...</p>
                    <button className="text-blue-500 mt-4 text-xl hover:text-blue-600 transition duration-200">
                        <FaEdit />
                    </button>
                </div>

                {/* Right Sidebar */}
                <div>
                    {/* Additional Details Section */}
                    <div className="bg-white p-6 shadow-lg mb-8">
                        <h3 className="text-xl font-semibold">Additional Details</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <MdEmail className="mr-2 text-gray-600" /> example@mail.com
                            </li>
                            <li className="flex items-center">
                                <MdPhone className="mr-2 text-gray-600" /> +123456789
                            </li>
                            <li className="text-gray-600">Language: English</li>
                        </ul>
                        <button className="text-blue-500 mt-4 text-xl hover:text-blue-600 transition duration-200">
                            <FaEdit />
                        </button>
                    </div>

                    {/* Social Links Section */}
                    <div className="bg-white p-6 shadow-lg">
                        <h3 className="text-xl font-semibold">Social Links</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <FaInstagram className="mr-2 text-gray-600" />
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    className="text-blue-500 hover:text-blue-600 transition duration-200"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaTwitter className="mr-2 text-gray-600" />
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    className="text-blue-500 hover:text-blue-600 transition duration-200"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaEdit className="mr-2 text-gray-600" />
                                <a
                                    href="https://website.com"
                                    target="_blank"
                                    className="text-blue-500 hover:text-blue-600 transition duration-200"
                                >
                                    Website
                                </a>
                            </li>
                        </ul>
                        <button className="text-blue-500 mt-4 text-xl hover:text-blue-600 transition duration-200">
                            <FaEdit />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
