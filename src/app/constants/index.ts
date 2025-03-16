import { GiPencilRuler } from "react-icons/gi";
import { TbChartInfographic } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoCodeSlash } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

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

const perksIcons = [];

export { jobsCategories };
