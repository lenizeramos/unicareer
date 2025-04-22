import { ICards } from "@/app/Types";
import ButtonComp from "../ButtonComp";
import { styles } from "@/app/styles";
import Image from "next/image";
import TagComp from "../TagComp";
import { jobsCategories } from "@/app/constants";
import FileDisplay from "../FileDisplay";

const JobCard = ({
  logo,
  title,
  subtitle,
  text,
  categories,
  companyname,
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
            <FileDisplay
              modelName="companyProfileImage"
              userId={logo || ""}
              width={90}
              height={90}
              className="profile-image-style overflow-hidden"
              fallbackImage={"img/img.png" || ""}
            />
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
          <h2 className={`font-monomakh text-2xl text-black`}>{title}</h2>
          <h3
            className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
          >
            {companyname}
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            {subtitle}
          </h3>
        </div>
        <div className="flex flex-col gap-5">
          {cardId === "featuredJob" && (
            <div className="max-h-12 ">
              <p className="text-blak truncate text-gray-500"> {text}</p>
            </div>
          )}
          <div className="flex gap-2">
            {Array.isArray(categories) &&
              categories.map((item, index) => {
                const stylesTag = jobsCategories.find(
                  (categ) => categ.title === item
                );
                return (
                  <TagComp
                    bgColor={`${stylesTag?.bgColor}`}
                    textColor={`${stylesTag?.textColor}`}
                    text={`${stylesTag?.title}`}
                    key={index}
                  />
                );
              })}
            {typeof categories === "string" && (
              <TagComp
                bgColor={`${
                  jobsCategories.find(
                    (style) =>
                      style.title.toLowerCase() === categories.toLowerCase()
                  )?.bgColor
                }`}
                textColor={`${
                  jobsCategories.find(
                    (style) =>
                      style.title.toLowerCase() === categories.toLowerCase()
                  )?.textColor
                }`}
                text={`${
                  jobsCategories.find(
                    (style) =>
                      style.title.toLowerCase() === categories.toLowerCase()
                  )?.title
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
