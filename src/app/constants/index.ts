import { GiPencilRuler } from "react-icons/gi";
import { TbChartInfographic } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoCodeSlash } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

//test
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { GiPaperBoat } from "react-icons/gi";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { FaAtlassian } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { TbTrain } from "react-icons/tb";
import { FaHandHoldingHeart } from "react-icons/fa";

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
];
const jobsTypes = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
  "Contract",
];
const salaryRange = [
  "$700 - $1000",
  "$100 - $1500",
  "$1500 - $2000",
  "$3000 or above",
];
const perksIcons = [
  MdOutlineHealthAndSafety,
  GiPaperBoat,
  AiTwotoneVideoCamera,
  FaAtlassian,
  GiCoffeeCup,
  TbTrain,
  FaHandHoldingHeart,
];
const jobPosted = [
  {
    id: "1",
    title: "Social Media Assistant",
    company: "Stripe",
    place: "Paris, France",
    type: "Full-Time",
    description:
      "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content development and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms, and suggest content ideas to the team",
      "Engage with online communities",
    ],
    whoYouAre: [
      "You get energy from people and building the ideal work environment",
      "You have a sense for beautiful spaces and office experiences",
      "You are a confident office manager, ready for added responsibilities",
      "You're detail-oriented and creative",
      "You're a growth marketer and know how to run campaigns",
    ],
    plus: [
      "Fluent in English",
      "Project management skills",
      "Copy editing skills",
    ],
    before: "July 31, 2021",
    createdAt: "July 1, 2021",
    salary: "$75k-$85k USD",
    category: ["Marketing", "Design"],
  },
  {
    id: "2",
    title: "Brand Designer",
    company: "Dropbox",
    place: "San Fransisco, USA",
    type: "Part-Time",
    description:
      "Dropbox is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content development and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms, and suggest content ideas to the team",
      "Engage with online communities",
    ],
    whoYouAre: [
      "You get energy from people and building the ideal work environment",
      "You have a sense for beautiful spaces and office experiences",
      "You are a confident office manager, ready for added responsibilities",
      "You're detail-oriented and creative",
      "You're a growth marketer and know how to run campaigns",
    ],
    plus: [
      "Fluent in English",
      "Project management skills",
      "Copy editing skills",
    ],
    before: "July 31, 2021",
    createdAt: "July 1, 2021",
    salary: "$75k-$85k USD",
    category: "Marketing",
  },
];
export { jobsCategories, perksIcons, jobsTypes, salaryRange, jobPosted };
