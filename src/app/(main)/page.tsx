"use client";
import { styles } from "@/app/styles";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import JobSearchForm from "@/app/components/JobSearchForm";
import ButtonComp from "@/app/components/ButtonComp";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Ijobs } from "../Types/slices";
import SearchNotFound from "../components/SearchNotFound";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    searchLocation: "",
  });
  const router = useRouter();
  const { user } = useClerk();
  const userRole = user?.publicMetadata?.role as string;
  const [jobs, setJobs] = useState<Ijobs[]>([]);
  const [recentJobs, setRecentJobs] = useState<Ijobs[]>([]);
  const [categoriesCount, setCategoriesCount] = useState<
    Record<string, number>
  >({});

  const hasFilters =
    filters.searchTerm.length > 2 || filters.searchLocation.length > 2;

  const fetchSearchedJobs = useCallback(async () => {
    try {
      const params = new URLSearchParams({ take: "6" });

      if (filters.searchTerm.length > 2) {
        params.append("searchTitle", filters.searchTerm);
      }

      if (filters.searchLocation.length > 2) {
        params.append("searchLocation", filters.searchLocation);
      }

      const response = await fetch(`/api/job/get-recent?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch filtered jobs");

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    }
  }, [filters]);

  const fetchInitialData = async () => {
    try {
      const [jobsRes, categoriesRes] = await Promise.all([
        fetch("/api/job/get-recent?take=6"),
        fetch("/api/job/get-count-by-category"),
      ]);

      if (!jobsRes.ok || !categoriesRes.ok)
        throw new Error("API request failed");

      const [recentJobsData, categoriesData] = await Promise.all([
        jobsRes.json(),
        categoriesRes.json(),
      ]);

      setRecentJobs(recentJobsData);
      setCategoriesCount(categoriesData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    if (hasFilters) fetchSearchedJobs();
  }, [hasFilters, fetchSearchedJobs]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleFilterChange = (
    key: string,
    value: string | { min: number; max: number }
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const mapJobData = (job: Ijobs) => ({
    logo: job.company?.userId ?? "/img/img.png",
    companyname: job.company?.name ?? "Unknown Company",
    date: job.createdAt,
    location: job.location,
    type: job.type,
    title: job.title,
    categories: job.categories,
    text: job.description,
  });

  const jobsData = jobs.map(mapJobData);
  const recentJobsData = recentJobs.map(mapJobData);

  const freqArray = Object.entries(categoriesCount).map(
    ([category, value]) => ({
      category,
      value: Number(value),
    })
  );
  const handleOnClick = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      if (userRole === "company") {
        router.push(`/dashboard/${userRole}`);
      } else {
        toast(
          <div className="flex items-center gap-3">
            <FaExclamationTriangle size={28} className="text-yellow-400" />
            <p className="text-[18px] text-gray-300 font-shafarik">
              To continue, please sign-in as a company.
            </p>
          </div>,
          {
            style: {
              background: "#202430",
              borderRadius: "8px",
              padding: "16px",
            },
            duration: 3000,
            position: "top-center",
          }
        );
      }
    }
  };
  const handleOnClickCard = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      if (userRole === "candidate") {
        router.push(`/dashboard/${userRole}/jobs`);
      } else {
        toast(
          <div className="flex items-center gap-3">
            <FaExclamationTriangle size={28} className="text-yellow-400" />
            <p className="text-[18px] text-gray-300 font-shafarik">
              To continue, please sign-in as a candidate.
            </p>
          </div>,
          {
            style: {
              background: "#202430",
              borderRadius: "8px",
              padding: "16px",
            },
            duration: 3000,
            position: "top-center",
          }
        );
      }
    }
  };
  return (
    <>
      <div className="bg-landingDark flex flex-col gap-5">
        <div className="md:p-15 p-10 flex flex-col gap-7">
          <h1
            className={`${styles.heroHeadTextDark} md:text-[6rem] sm:text-[5rem] xs:text-[4rem] text-[3rem] flex flex-col`}
          >
            Discover more than
            <span className={`${styles.heroHeadSpan}`}>5000+ Jobs</span>
          </h1>
          <p
            className={`${styles.heroSubText}  text-gray-400 md:text-2xl sm:text-xl xs:text-base text-sm text-justify`}
          >
            Great platform for the job seeker that searching for{" "}
            <br className="sm:block hidden" /> new career heights and passionate
            about startups.
          </p>
          <JobSearchForm onFilterChange={handleFilterChange} />
          {hasFilters ? (
            jobs.length === 0 ? (
              <SearchNotFound text="No matching jobs found." />
            ) : (
              <CardsContainer
                params={jobsData}
                cardId="recentPosted"
                styles="grid grid-cols-1 sm:grid-cols-2 gap-5"
              />
            )
          ) : (
            <div />
          )}
        </div>

        <div className="md:p-15 p-10 flex flex-col gap-10 bg-blue-950">
          <h2
            className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
          >
            Explore by
            <span className={`text-[#26a4ff]`}> Category</span>
          </h2>
          <div className="flex flex-row gap-10 flex-wrap justify-center">
            <CardsContainer
              cardId="category"
              frequencies={freqArray}
              onClick={() => handleOnClickCard()}
            />
          </div>
        </div>

        <div className="md:p-15 p-10 flex flex-col gap-5">
          <h2
            className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
          >
            Featured
            <span className={`${styles.heroHeadSpan}`}> jobs</span>
          </h2>
          {recentJobs.length > 0 && (
            <CardsContainer cardId="featuredJob" params={recentJobsData} />
          )}
        </div>

        <div className="md:p-15 p-10 w-full flex flex-col lg:flex-row bg-blue-950 justify-between">
          <div className="flex flex-col p-6 gap-5">
            <h2
              className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
            >
              Start <span className={`text-[#26a4ff]`}> posting</span> jobs
              today
            </h2>
            <p
              className={`${styles.sectionHeadText} p-2 text-white text-sm sm:text-base lg:text-lg`}
            >
              Start posting jobs for only{" "}
              <span className={`text-[#26a4ff]`}> $10.</span>
            </p>
            <ButtonComp
              text="Sign Up For Free"
              IsWhite={true}
              onClick={handleOnClick}
            />
          </div>
          <div className="w-full h-65 sm:h-110 relative">
            <Image
              src="/img/CompanyDashboard.jpg"
              alt="CompanyDashboard"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 100vw"
              className="object-cover object-left-top"
            />
          </div>
        </div>
      </div>
    </>
  );
}
