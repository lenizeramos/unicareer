"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBuilding,
  FaUsers,
  FaMapMarkerAlt,
  FaIndustry,
  FaGlobe,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import CompanyHeader from "@/app/components/CompanyHeader";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { useEffect } from "react";
import { fetchCompany } from "@/app/context/slices/companySlice";
import { ICards, IJob } from "@/app/Types";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

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
        location: job.location,
        styleCard: "",
      }));

      setCards(cardsList);
    };

    fetchJobs();
  }, [company]);

  const companyData = [
    {
      icon: FaIndustry,
      title: "Industry",
      text: company?.industry,
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      text: company?.city,
    },
    {
      icon: FaUsers,
      title: "Employees",
      text: company?.size,
    },
    {
      icon: FaBuilding,
      title: "Founded",
      text: company?.foundedYear,
    },
  ];

  const companySocialMedia = [
    {
      href: company?.twitter ? `https://twitter.com/${company.twitter}` : "#",
      icon: FaXTwitter,
      iconStyles: "bg-black hover:bg-gray-600",
      label: "X (Twitter)",
    },
    {
      href: company?.linkedIn || "#",
      icon: FaLinkedinIn,
      iconStyles: "bg-blue-700 hover:bg-blue-800",
      label: "LinkedIn",
    },
    {
      href: company?.email ? `mailto:${company.email}` : "#",
      icon: MdEmail,
      iconStyles: "bg-gray-500 hover:bg-gray-700",
      label: "Email",
    },
    {
      href: company?.website || "#",
      icon: FaGlobe,
      iconStyles: "bg-blue-600 hover:bg-blue-700",
      label: "Website",
    },
  ];
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <CompanyHeader
        image={"/img/img.png"}
        name={"Company Profile"}
        isDashboard={false}
        button={{
          text: "Edit Profile",
          IsWhite: false,
          width: "w-xs",
          icon: <FaPlus />,
          onClick: () => {
            router.push("/dashboard/company/profile/edit");
          },
        }}
      />
      <div className="flex flex-row flex-wrap gap-5 justify-evenly w-full mt-5">
        {companyData.map((data, index) => {
          return (
            <div className="flex items-center gap-2 font-shafarik" key={index}>
              <div className="p-2 bg-gray-100 rounded-full">
                {<data.icon className="text-blue-500 text-xl" />}
              </div>
              <div className="flex gap-2">
                <span className="font-medium">{data.title}:</span>
                <span>{data.text || "Not specified"}</span>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="my-4 border-t border-gray-200 w-full" />

      <div className="flex lg:flex-row flex-col gap-8 relative">
        <div className="flex-1">
          <h3 className="xs:text-2xl text-xl font-semibold mb-3 font-monomakh">
            About the company
          </h3>
          <p className="text-gray-600 leading-relaxed font-shafarik xs:text-xl text-lg text-justify">
            {company?.bio || ""}
          </p>

          <hr className="my-8 border-t border-gray-200 w-full" />

          <div className="mt-4">
            <h3 className="xs:text-2xl text-xl font-semibold mb-3 font-monomakh">
              Contact
            </h3>
            <div className="flex gap-4 mt-7">
              {companySocialMedia.map((item, index) => {
                return (
                  <a
                    href={item.href}
                    className={`p-3 text-white rounded-full ${item.iconStyles} transition-colors relative group`}
                    key={index}
                  >
                    {<item.icon className="text-xl" />}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
          {company?.benefits && company?.benefits?.length > 0 && (
            <div className="mt-8">
              <h3 className="xs:text-2xl text-xl font-semibold mb-6 font-monomakh">
                Benefits & Perks
              </h3>
              <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-5">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="shadow-md flex p-4 gap-2">
                    <IoIosCheckmarkCircleOutline className="text-green-700" />
                    <p className="font-shafarik">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {cards.length > 0 && (
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="xs:text-2xl text-xl font-semibold font-monomakh">
                  Open Positions
                </h3>
              </div>

              <CardsContainer cardId="openPositions" params={cards} />
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-4 space-y-6">
            {company?.toolsAndTechnologies && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="xs:text-2xl text-xl font-semibold mb-3">
                  Tech Stack
                </h3>
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
              <h3 className="sm:text-xl xs:text-2xl text-xl font-semibold mb-3 font-monomakh text-center">
                Office Location
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm font-shafarik">
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
