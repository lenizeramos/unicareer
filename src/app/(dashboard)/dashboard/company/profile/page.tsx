"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBuilding,
  FaUsers,
  FaMapMarkerAlt,
  FaIndustry,
  FaGlobe,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import BenefitCard from "@/app/components/BenefitCard";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import CompanyHeader from "@/app/components/CompanyHeader";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect } from "react";
import { fetchCompany } from "@/app/context/slices/companySlice";
import { ICards, IJob } from "@/app/Types";

const CompanyProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector((state: RootState) => state.companyState.company);
  const [cards, setCards] = useState<ICards[]>([]);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!company?.id || !company?.name) return;

      const res = await fetch(`/api/company/jobs/open?limit=6`);
      const jobs = await res.json();

      const cardsList: ICards[] = jobs.map((job: IJob) => ({
        cardId: "openPositions",
        title: job.title,
        companyname: company.name,
        date: "Posted 2 days ago",
        companyId: company.id,
        type: job.type,
        categories: job.categories,
      }));

      setCards(cardsList);
    };

    fetchJobs();
  }, [company]);


  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <div className="[&_img]:w-32 [&_img]:h-32">
        <CompanyHeader
          image={company?.photo || "/img/img.png"}
          name={company?.name || "Company Name"}
          userId={company?.userId}
          button={{
            text: "Edit Profile",
            IsWhite: false,
            width: "w-xs",
            icon: <FaPlus />,
            onClick: ()=>{router.push("/dashboard/company/profile/edit");},
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
              <span>{company?.industry || "Not specified"}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <FaMapMarkerAlt className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Location:</span>
              <span>{company?.city || "Not specified"}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <FaUsers className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Employees:</span>
              <span>{company?.size || "Not specified"}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <FaBuilding className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Founded:</span>
              <span>{company?.foundedYear || "Not specified"}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-t border-gray-200 w-full" />

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Company Profile</h3>
          <p className="text-gray-600 leading-relaxed">{company?.bio || ""}</p>

          <hr className="my-8 border-t border-gray-200 w-full" />

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-3">Contact</h3>
            <div className="flex gap-4">
              <a
                href={
                  company?.twitter
                    ? `https://twitter.com/${company.twitter}`
                    : "#"
                }
                className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href={company?.linkedIn || "#"}
                className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                href={company?.email ? `mailto:${company.email}` : "#"}
                className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                <MdEmail className="text-xl" />
              </a>
              <a
                href={company?.website || "#"}
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaGlobe className="text-xl" />
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6">Benefits & Perks</h3>
            <div className="flex flex-col md:flex-row gap-6">
              {company?.benefits &&
                company?.benefits?.length > 0 &&
                company.benefits.map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    title={benefit}
                    backgroundColor={"bg-blue-200"}
                  />
                ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold">Open Positions</h3>
            </div>

            <CardsContainer cardId="openPositions" params={cards} />
          </div>

          <hr className="my-8 border-t border-gray-200 w-full" />
        </div>

        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-4 space-y-6">
            {company?.toolsAndTechnologies && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {company?.toolsAndTechnologies?.length > 0 ? (
                    company.toolsAndTechnologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">
                      No technologies listed
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Office Location</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-700">Headquarters</h4>
                  <p className="text-gray-600">
                    {company?.streetAddress || ""}
                    {company?.city ? `, ${company.city}` : ""}
                    {company?.province ? `, ${company.province}` : ""}
                    {company?.postalCode ? `, ${company.postalCode}` : ""}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {company?.country || ""}
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
