import { ICards } from "@/app/Types";
import ButtonComp from "../ButtonComp";
import { styles } from "@/app/styles";
import TagComp from "../TagComp";
import { jobsCategories } from "@/app/constants";
import FileDisplay from "../FileDisplay";

const JobCard = ({
  logo,
  title,
  text,
  categories,
  companyname,
  type,
  cardId,
  location,
}: ICards) => {
  return (
    <>
      <div
        className={`${styles.categoryCard} bg-white flex flex-col gap-5 max-w-2xs max-h-2xs border border-gray-400`}
      >
        <div className="flex items-center justify-between gap-5">
          <div className="">
            <FileDisplay
              modelName="companyProfileImage"
              userId={logo || ""}
              width={90}
              height={90}
              className="profile-image-style overflow-hidden"
              fallbackImage={"/img/img.png"}
            />
          </div>
          {cardId === "featuredJob" ? (
            <ButtonComp text={`${type}`} IsWhite={true} />
          ) : (
            <TagComp
              bgColor="bg-[#cbfbf1]"
              textColor="text-[#009c8f]"
              text={`${type}`}
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className={`font-monomakh text-2xl text-black`}>{title}</h2>
          <h3
            className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
          >
            {companyname}
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            {location}
          </h3>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          {cardId === "featuredJob" && (
            <div className="max-h-12 ">
              <p className=" text-gray-500 line-clamp-3 text-xs text-justify">
                {" "}
                {text}
              </p>
            </div>
          )}
          <div className="flex gap-2">
            {categories && (
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
