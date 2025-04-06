import { GiPencilRuler } from "react-icons/gi";
import { TbChartInfographic } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoCodeSlash } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";

//test
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { GiPaperBoat } from "react-icons/gi";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { FaAtlassian } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { TbTrain } from "react-icons/tb";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IFilterJobs } from "../Types";

const stylesTags = [
  "bg-[#ddd6ff] text-[#2f0d67] border-[#2f0d67]",
  "bg-[#f6d0ff] text-[#8a0194] border-[#8a0194]",
  "bg-[#dbe9fe] text-[#1447e6] border-[#1447e6]",
  "bg-[#fff0ed] text-[#ff7664] border-[#ff7664]",
  "bg-[#e5e7eb] text-[#4a5565] border-[#4a5565]",
  "bg-[#ececfc] text-[#504ae0] border-[#504ae0]",
  "bg-[#fdf3eb] text-[#ffb836] border-[#ffb836]",
  "bg-[#eefaf7] text-[#69d3b6] border-[#69d3b6]",
  "bg-[#dacead] text-[#524d41] border-[#524d41]",
  "bg-[#cbfbf1] text-[#009c8f] border-[#009c8f]",
];

const jobsCategories = [
  {
    icon: GiPencilRuler,
    title: "Design",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#fdf3eb]",
    textColor: "text-[#ffb836]",
    border: "border border-[#ffb836]",
  },
  {
    icon: TbChartInfographic,
    title: "Sales",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#e5e7eb]",
    textColor: "text-[#4a5565]",
    border: "border border-[#4a5565]",
  },
  {
    icon: HiOutlineSpeakerphone,
    title: "Marketing",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#eefaf7]",
    textColor: "text-[#69d3b6]",
    border: "border border-[#69d3b6]",
  },
  {
    icon: GiMoneyStack,
    title: "Finance",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#ececfc]",
    textColor: "text-[#504ae0]",
    border: "border border-[#504ae0]",
  },
  {
    icon: HiOutlineDesktopComputer,
    title: "Technology",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#fff0ed]",
    textColor: "text-[#ff7664]",
    border: "border border-[#ff7664]",
  },
  {
    icon: IoCodeSlash,
    title: "Engineering",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#dbe9fe]",
    textColor: "text-[#1447e6]",
    border: "border border-[#1447e6]",
  },
  {
    icon: LuBriefcaseBusiness,
    title: "Business",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#f6d0ff]",
    textColor: "text-[#8a0194]",
    border: "border border-[#8a0194]",
  },
  {
    icon: IoPeopleOutline,
    title: "Human Resource",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#ddd6ff]",
    textColor: "text-[#2f0d67]",
    border: "border border-[#2f0d67]",
  },
  {
    icon: FaCode,
    title: "Development",
    subicons: FaArrowRightLong,
    bgColor: "bg-[#dacead]",
    textColor: "text-[#524d41]",
    border: "border border-[#524d41]",
  },
];
const categoriesArray = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
  "Development",
];
const jobsTypes = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
  "Contract",
  "Freelance",
];

const jobLevel = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Director",
  "VP or Above",
];

const salaryRange = [
  { min: 10, max: 20 },
  { min: 20, max: 30 },
  { min: 30, max: 40 },
  { min: 40, max: 50 },
  { min: 50, max: 60 },
  { min: 60, max: 70 },
  { min: 70, max: 80 },
  { min: 90, max: 10 },
];
const filtersValues: IFilterJobs[] = [
  { array: jobsTypes, title: "Type of Employment", type: "jobType" },
  { array: categoriesArray, title: "Categories", type: "category" },
  { array: jobLevel, title: "Job Level", type: "jobLevel" },
  { array: salaryRange, title: "Salary Range", type: "salary" },
];

const perksData = [
  {
    icon: MdOutlineHealthAndSafety,
    title: "Full Healthcare",
    text: "We believe in thriving communities and that starts with our team being happy and healthy.",
  },
  {
    icon: GiPaperBoat,
    title: "Unlimited Vacation",
    text: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
  },
  {
    icon: AiTwotoneVideoCamera,
    title: "Skill Development",
    text: "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
  },
  {
    icon: FaAtlassian,
    title: "Team Summits",
    text: "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
  },
  {
    icon: GiCoffeeCup,
    title: "Remote Working",
    text: "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.",
  },
  {
    icon: TbTrain,
    title: "Commuter Benefits",
    text: "We’re grateful for all the time and energy each team member puts into getting to work every day.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "We give back.",
    text: "We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most—times two. ",
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export {
  perksData,
  jobsCategories,
  categoriesArray,
  jobsTypes,
  salaryRange,
  jobLevel,
  stylesTags,
  monthNames,
  filtersValues,
};

/* forms*/

const classNameDivContainer = "flex flex-col lg:flex-row lg:items-start";
const classNameDivContainerTextArea = "md:col-span-2 space-y-2";
const classNameLabel = "text-sm font-semibold text-gray-700 lg:w-1/5 lg:pr-4";
const classNameDivLgWidth = "lg:w-4/5";
const classNameField =
  "w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640de] focus:border-transparent transition";
const classNamePadding = "lg:py-3";

export {
  classNameDivContainer,
  classNameDivContainerTextArea,
  classNameLabel,
  classNameDivLgWidth,
  classNameField,
  classNamePadding,
};
