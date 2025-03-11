import React from 'react';
import ButtonComp from './ButtonComp';
import { FaBuilding, FaUsers, FaMapMarkerAlt, FaIndustry, FaCog, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

const CompanyProfile = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
    <div className="flex items-center justify-between">
        <div className="flex items-center">
            <div className="flex-none w-35 h-35 bg-green-300 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-2xl">N</span>
            </div>
            <div className="ml-4">
                <h2 className="text-2xl font-bold">Name of the company</h2>
                <a href="https://companywebsite.com" className="text-blue-500">
                    https://companywebsite.com
                </a>
            </div>
        </div>
        <ButtonComp 
            text={
                <div className="flex items-center gap-2">
                    <FaCog /> Profile Settings
                </div>
            }
            IsWhite={true}
        />
    </div>

    <div className="mt-4 flex flex-row-reverse items-center gap-4 text-gray-600">

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
    <div className="mt-5 flex justify-between">
        <ButtonComp 
            text="Post a job"
            IsWhite={false}
        />
    </div>
    <hr className="my-4 border-t border-gray-200 w-full" />
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">Company Profile</h3>
      <p className="text-gray-600 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>

    <hr className="my-4 border-t border-gray-200 w-full" />

    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">Contact</h3>
      <div className="flex gap-4">
        <a href="#" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          <FaFacebookF className="text-xl" />
        </a>
        <a href="#" className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
          <FaTwitter className="text-xl" />
        </a>
        <a href="#" className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
          <FaLinkedinIn className="text-xl" />
        </a>
        <a href="#" className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
          <FaInstagram className="text-xl" />
        </a>
        <a href="mailto:#" className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
          <MdEmail className="text-xl" />
        </a>
      </div>

      <hr className="my-4 border-t border-gray-200 w-full" />

            
    </div>
</div>
  );
};

export default CompanyProfile;