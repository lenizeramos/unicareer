import { styles } from "@/app/styles";
import { ICards } from "@/app/Types";
import Image from "next/image";
import ButtonComp from "../ButtonComp";
import ProgressBar from "../ProgressBar";
import TagComp from "../TagComp";
import { jobPosted, jobsCategories } from "@/app/constants";

const JobResumeCards = ({
  id,
  logo,
  title,
  category,
  company,
  type,
  cardId,
  place,
}: ICards) => {
  let categoryArray = [];

  return (
    <>
      <div
        className={`${styles.categoryCard} flex md:flex-row flex-col justify-between md:items-center md:gap-10 gap-5`}
      >
        <div className="flex md:flex-row flex-col gap-5 items-center">
          <div>
            <Image
              src={"/img/logo.svg"}
              alt={`${company}_logo`}
              width={50}
              height={50}
            />
            {logo}
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className={`${styles.sectionHeadText} text-black`}>
                {title}
              </h3>
              <h4
                className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
              >
                {company}
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                {place}
              </h4>
            </div>
            <div className="flex gap-3">
              <TagComp
                bgColor="bg-[#cbfbf1]"
                textColor="text-[#009c8f]"
                text={`${type}`}
              />
              <div className="w-[1px] bg-gray-300 rounded-full" />
              <div className="flex gap-2">
                {category && Array.isArray(category) ? (
                  category.map((item, index) => {
                    const stylesTag = jobsCategories.find(
                      (cat) => cat.title === item
                    );
                    console.log(stylesTag, index);
                    return (
                      <TagComp
                        bgColor={`${stylesTag?.bgColor}`}
                        textColor={`${stylesTag?.textColor}`}
                        text={`${stylesTag?.title}`}
                        key={index}
                      />
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
        {cardId === "allJobs" ? (
          <div className="flex flex-col gap-2">
            <ButtonComp text="Apply" IsWhite={false} width="w-full" />
            <ProgressBar totalLength={10} value={5} />
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default JobResumeCards;
