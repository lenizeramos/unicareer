import React from "react";
import ButtonComp from "@/app/components/ButtonComp";
import {
  FaBuilding,
  FaUsers,
  FaMapMarkerAlt,
  FaIndustry,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  FiCoffee,
  FiHome,
  FiAward,
  FiHeart,
  FiBookOpen,
  FiSmile,
} from "react-icons/fi";
import BenefitCard from "@/app/components/BenefitCard";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import CompanyHeader from "@/app/components/CompanyHeader";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { getUserByClerkId } from "@/Lib/client/usersService";

const CompanyProfile = async () => {
  const session = await auth();

  if (!session?.userId) {
    redirect("/sign-in");
  }

  const userData = await getUserByClerkId(session.userId);

  if (!userData?.company) {
    redirect("/dashboard");
  }

  const companyData = userData.company;
  console.log("Company userId:", companyData.userId);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <div className="[&_img]:w-32 [&_img]:h-32">
        <CompanyHeader
          image="/img/img.png"
          name={companyData.name}
          userId={companyData.userId}
          button={{
            text: "Edit Profile",
            IsWhite: false,
            width: "w-xs",
            icon: <FaPlus />,
          }}
        />
      </div>
      <div className="mt-4 flex flex-col lg:flex-row-reverse items-start lg:items-center gap-4 text-gray-600">
        <div className="grid grid-cols-2 lg:flex lg:flex-row gap-4 w-full">
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <FaIndustry className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Industry:</span>
              <span>Industry of the company</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <FaMapMarkerAlt className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Location:</span>
              <span>Location of the company</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <FaUsers className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Employees:</span>
              <span>Number of employees</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <FaBuilding className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Founded:</span>
              <span>Date of establishment</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4 border-t border-gray-200 w-full" />

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Company Profile</h3>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <hr className="my-8 border-t border-gray-200 w-full" />

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-3">Contact</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="#"
                className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                href="#"
                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="mailto:#"
                className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                <MdEmail className="text-xl" />
              </a>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-3">Image Gallery</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Image
                src="/company-image-1.jpg"
                alt="Company image 1"
                width={320}
                height={128}
                className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                priority={true}
              />
              <Image
                src="/company-image-2.jpg"
                alt="Company image 2"
                width={320}
                height={128}
                className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
              />
              <Image
                src="/company-image-3.jpg"
                alt="Company image 3"
                width={320}
                height={128}
                className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
              />
              <Image
                src="/company-image-4.jpg"
                alt="Company image 4"
                width={320}
                height={128}
                className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
              />
              <Image
                src="/company-image-5.jpg"
                alt="Company image 5"
                width={320}
                height={128}
                className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
              />
              <Image
                src="/company-image-6.jpg"
                alt="Company image 6"
                width={320}
                height={128}
                className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-3">Our Team</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
                <Image
                  src="/team-member-1.jpg"
                  alt="Team member"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="sm:ml-6">
                  <h4 className="font-semibold text-lg">John Doe</h4>
                  <p className="text-gray-600">CEO & Founder</p>
                  <p className="text-sm text-gray-500 mt-2">
                    10+ years of experience in software development
                  </p>
                  <div className="flex gap-3 mt-3">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <FaLinkedinIn />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      <MdEmail />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
                <Image
                  src="/team-member-2.jpg"
                  alt="Team member"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="sm:ml-6">
                  <h4 className="font-semibold text-lg">Jane Smith</h4>
                  <p className="text-gray-600">CTO</p>
                  <p className="text-sm text-gray-500 mt-2">
                    8 years of experience in tech leadership
                  </p>
                  <div className="flex gap-3 mt-3">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <FaLinkedinIn />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      <MdEmail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6">Benefits & Perks</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BenefitCard
                icon={FiCoffee}
                title="Flexible Hours"
                description="Work when you're most productive. We trust you to manage your time effectively."
              />
              <BenefitCard
                icon={FiHome}
                title="Remote Work"
                description="Work from anywhere in the world. Our team is fully distributed."
              />
              <BenefitCard
                icon={FiAward}
                title="Learning Budget"
                description="$1,000 annual budget for courses, books, and conferences."
              />
              <BenefitCard
                icon={FiHeart}
                title="Health Insurance"
                description="Comprehensive health, dental, and vision coverage for you and your family."
              />
              <BenefitCard
                icon={FiBookOpen}
                title="Paid Time Off"
                description="Unlimited vacation policy. Take time off when you need it."
              />
              <BenefitCard
                icon={FiSmile}
                title="Team Events"
                description="Regular virtual and in-person team gatherings and activities."
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold">Open Positions</h3>
              <ButtonComp text="View All Positions" IsWhite={true} />
            </div>

            <CardsContainer
              cardId="openPositions"
              params={[
                {
                  cardId: "openPositions",
                  title: "Senior Frontend Developer",
                  companyname: "Your Company Name",
                  date: "Posted 2 days ago",
                  text: "Full-time · Remote · Senior Level",
                },
                {
                  cardId: "openPositions",
                  title: "Backend Engineer",
                  companyname: "Your Company Name",
                  date: "Posted 3 days ago",
                  text: "Full-time · Remote · Mid Level",
                },
              ]}
            />
          </div>

          <hr className="my-8 border-t border-gray-200 w-full" />
        </div>

        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-4 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                  AWS
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                  Docker
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                  PostgreSQL
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                  MongoDB
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Office Locations</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-700">Headquarters</h4>
                  <p className="text-gray-600">San Francisco, CA</p>
                  <p className="text-gray-500 text-sm">
                    123 Tech Street, 94105
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-700">Europe Office</h4>
                  <p className="text-gray-600">London, UK</p>
                  <p className="text-gray-500 text-sm">
                    456 Innovation Ave, EC1A 1BB
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-700">Asia Office</h4>
                  <p className="text-gray-600">Singapore</p>
                  <p className="text-gray-500 text-sm">
                    789 Digital Road, 018956
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
