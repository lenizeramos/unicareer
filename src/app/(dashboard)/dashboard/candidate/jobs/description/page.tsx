"use client";

import { useSearchParams } from "next/navigation";
import DashboardNavbar from "../../../../../components/DashboardNavbar";
import ButtonComp from "@/app/components/ButtonComp";
import { styles } from "@/app/styles";
import { jobsCategories, monthNames, stylesTags } from "@/app/constants";
import { CiCircleCheck } from "react-icons/ci";
import TagComp from "@/app/components/TagComp";
import { AppDispatch, RootState } from "@/app/context/store";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationsState, IJobsState, IUserState } from "@/app/Types/slices";
import { useEffect } from "react";
import { fetchAllJobs } from "@/app/context/slices/jobSlices";
import { fetchUsers } from "@/app/context/slices/usersSlices";
import { useRouter } from "next/navigation";
import { useCandidateData } from "@/Lib/client/candidate";
import { fetchApplications } from "@/app/context/slices/applicationsSlices";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";
import FileDisplay from "@/app/components/FileDisplay";
import SearchNotFound from "@/app/components/SearchNotFound";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";


export default function JobDescription() {
  const router = useRouter();
  const { candidate, isLoading } = useCandidateData();

  const dispatch: AppDispatch = useDispatch();
  const { jobs, loading } = useSelector(
    (state: RootState) => state.jobs as IJobsState
  );
  const { users } = useSelector(
    (state: RootState) => state.users as IUserState
  );
  const { applications } = useSelector(
    (state: RootState) => state.applications as IApplicationsState
  );
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const job = jobs.find((item) => item.id === id);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [jobs.length, dispatch]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers("company"));
    }
  }, [users.length, dispatch]);

  useEffect(() => {
    if (applications.length === 0) {
      dispatch(fetchApplications());
    }
  }, [applications.length, dispatch]);
  const company = users.find((company) => company.id === job?.companyId);
  if (loading) {
    return <Loader />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!job) {
    return (
      <>
        <DashboardNavbar
          title="Job Description"
          button={{ text: "Back to home page", IsWhite: true }}
        />
        <div className="w-full border-t border-gray-200 mt-5">
          <SearchNotFound
            text="This job is no longer available."
            optionSubText={false}
          />
        </div>
      </>
    );
  }
  if (!candidate) {
    return (
      <>
        <p>Not Found</p>
      </>
    );
  }

  const getDate = (date: string) => {
    const createDate = new Date(date);
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()} , ${createDate.getFullYear()} `;
  };
  const category =
    typeof job.categories === "string" ? job.categories.toLowerCase() : "";

  const application =
    candidate.applications &&
    candidate.applications.some((item) => item.jobId === job.id);

  const handleApplicationSubmit = async () => {
    if (!candidate) {
      console.error("No candidate ID available");
      return;
    }
    try {
      const response = await fetch("/api/application/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          candidateId: candidate.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Application error: ${response.statusText}`);
      }
      toast.success("You've successfully applied to the job!", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#6f66ff4a",
          fontFamily: "fantasy",
          fontSize: "1rem",
          borderRadius: "8px",
          letterSpacing: "0.5px",
        },
      });
      setTimeout(() => {
        router.push("/dashboard/candidate/jobs");
      }, 2500);
    } catch (error) {
      console.error("Error submitting your application:", error);
    }
  };

  return (
    <>
      <DashboardNavbar
        title="Job Description"
        button={{ text: "Back to dashboard", IsWhite: true }}
      />
      <div className="flex flex-col gap-10 mx-5">
        <div className="border-t-[1px] border-gray-200 py-5">
          <div className="bg-[#f8f8fd] xs:p-10 p-5">
            <div className="flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start bg-white p-5 border border-gray-200 gap-5 md:gap-0 ">
              <div className="flex md:flex-row flex-col gap-5 md:items-center items-start">
                <FileDisplay
                  modelName="companyProfileImage"
                  userId={company?.userId || ""}
                  width={90}
                  height={90}
                  fallbackImage={"/img/img.png"}
                />
                <div>
                  <h1 className={`${styles.sectionHeadText} pb-2`}>
                    {job.title}
                  </h1>
                  <p
                    className={`flex items-center gap-2 ${styles.sectionSubText} xs:text-lg text-sm`}
                  >
                    {company?.name}
                    <span className="bg-gray-600 rounded-full w-1 h-1" />
                    {job.location}
                  </p>
                </div>
              </div>
              <div className="md:pl-10 md:border-l-[1px] border-gray-200 md:w-[8rem] w-full">
                {application ? (
                  <ButtonComp
                    text="Applied"
                    IsWhite={false}
                    width="w-full"
                    isDissable={true}
                  />
                ) : (
                  <ButtonComp
                    text="Apply"
                    IsWhite={false}
                    width="w-full"
                    onClick={handleApplicationSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-10 ">
          <div className="flex flex-col gap-5 lg:w-[55%]">
            <div className="lg:pr-0 md:pr-30">
              <h2 className={`${styles.JobDescriptionTitle}`}>Description</h2>
              <p className={`${styles.JobDescriptionText}`}>
                {job.description}
              </p>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle}`}>
                Responsibilities
              </h2>
              <p className={`${styles.JobDescriptionText} whitespace-pre-line`}>
                {job.responsibilities}
              </p>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle} `}>Who You Are</h2>
              <p className={`${styles.JobDescriptionText} whitespace-pre-line`}>
                {job.whoYouAre}
              </p>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle} `}>Nice To Have</h2>
              <p className={`${styles.JobDescriptionText} whitespace-pre-line`}>
                {job.niceToHave}
              </p>
            </div>
          </div>

          <div className=" flex lg:flex-col flex-col md:gap-0 gap-5 border-t border-gray-100 pt-5 lg:pt-0 lg:border-0 mx-auto lg:w-1/3">
            <div className="flex flex-col gap-4 pb-5 ">
              <h2 className={`font-semibold font-monomakh sm:text-3xl text-xl`}>
                About this role
              </h2>
              <div className="flex gap-4 ">
                <p className={`${styles.JobDescriptionText}`}>Apply Before</p>
                <p className={`${styles.JobDescriptionText} font-bold`}>
                  {getDate(job.closingDate)}
                </p>
              </div>
              <div className="flex gap-4 ">
                <p className={`${styles.JobDescriptionText}`}>Job Posted</p>
                <p className={`${styles.JobDescriptionText} font-bold`}>
                  {getDate(job.createdAt)}
                </p>
              </div>
              <div className="flex gap-4 ">
                <p className={`${styles.JobDescriptionText}`}>Job Type</p>
                <p className={`${styles.JobDescriptionText} font-bold`}>
                  {job.type}
                </p>
              </div>
              <div className="flex gap-4">
                <p className={`${styles.JobDescriptionText}`}>Salary</p>
                <p
                  className={`${styles.JobDescriptionText} font-bold flex gap-2 items-center`}
                >
                  <FaMoneyBillWave /> ${job.salaryMin} - $ {job.salaryMax}
                </p>
              </div>
            </div>

            <div className="">
              <div className="flex gap-5 items-center border-y-[1px] border-gray-200 py-5">
                <h2 className={`font-semibold font-monomakh sm:text-3xl text-xl`}>Category</h2>
                <TagComp
                  bgColor={`${
                    jobsCategories.find(
                      (style) => style.title.toLowerCase() === category
                    )?.bgColor
                  }`}
                  textColor={`${
                    jobsCategories.find(
                      (style) => style.title.toLowerCase() === category
                    )?.textColor
                  }`}
                  text={`${
                    jobsCategories.find(
                      (style) => style.title.toLowerCase() === category
                    )?.title
                  }`}
                />
              </div>

              <div className="pt-5">
                <h2 className={`${styles.JobDescriptionTitle}`}>
                  Required Skills
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {Array.isArray(job.skills) ? (
                    job.skills.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`p-2 w-fit rounded-full text-gray-700 bg-gray-100 font-shafarik`}
                        >
                          {item}
                        </div>
                      );
                    })
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>

            <div className="lg:hidden w-0.5  bg-gray-200 md:flex hidden" />

            {/* <div className="lg:py-5 md:block hidden">
              <h2 className={`${styles.JobDescriptionTitle}`}>
                Required Skills
              </h2>
              <div className="flex gap-5 flex-wrap justify-center">
                {Array.isArray(job.skills) ? (
                  job.skills.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.sectionSubText} p-2 w-fit rounded-full mb-2 ${stylesTags[index]}`}
                      >
                        {item}
                      </div>
                    );
                  })
                ) : (
                  <div />
                )}
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-t-[1px] border-gray-200 pt-4">
          <h2 className={`${styles.JobDescriptionTitle} text-4xl`}>
            Perks & Benefits
          </h2>
          <p className={`${styles.JobDescriptionText}`}>
            This job comes with several perks and benefits
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 grid-cols-1">
            {job.benefits.map((benefit: string, index) => {
              return (
                <li
                  key={index}
                  className={`${styles.JobDescriptionText} ${styles.lists}`}
                >
                  <CiCircleCheck color="green" size={20} /> {benefit}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
