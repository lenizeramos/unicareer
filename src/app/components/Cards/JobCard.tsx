import { ICards } from "@/app/Types";
import ButtonComp from "../ButtonComp";
import { styles } from "@/app/styles";
import Image from "next/image";
import ProgressBar from "../ProgressBar";
import TagComp from "../TagComp";

const JobCard = ({
  logo,
  title,
  subtitle,
  text,
  alt,
  category,
  company,
  type,
  cardId,
}: ICards) => {
  return (
    <>
      <div
        className={`${styles.categoryCard} flex flex-col gap-5 max-w-2xs max-h-2xs border border-gray-400`}
      >
        <div className="flex items-center justify-between gap-5">
          <div className="">
            <Image src={"img/logo.svg"} alt={`${alt}`} width={40} height={40} />
            {logo}
          </div>
          {cardId === "featuredJob" ? (
            <ButtonComp text={`Full Time ${type}`} IsWhite={true} />
          ) : (
            <TagComp
              bgColor="bg-[#cbfbf1]"
              textColor="text-[#009c8f]"
              text={`${type}`}
            />
          )}
        </div>
        <div className="">
          <h2 className={`${styles.sectionHeadText} text-black`}>
            {title}
          </h2>
          <h3
            className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
          >
            {company}
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            {subtitle}
          </h3>
        </div>
        <div className="flex flex-col gap-5">
          {cardId === "featuredJob" ? (
            <div className="max-h-12 ">
              <p className="text-blak truncate text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit {text}
              </p>
            </div>
          ) : (
            <ProgressBar totalLength={10} value={5} />
          )}

          <div className="flex gap-5">
            <TagComp
              bgColor="bg-[#eefaf7]"
              textColor="text-[#69d3b6]"
              text={`${category}`}
            />
            <TagComp
              bgColor="bg-[#e5e7eb]"
              textColor="text-[#4a5565]"
              text={`${category}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
