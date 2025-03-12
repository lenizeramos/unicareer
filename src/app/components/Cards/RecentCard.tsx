import { styles } from "@/app/styles";
import TagComp from "../TagComp";
import { ICards } from "@/app/Types";
import Image from "next/image";

const RecentCard = ({
  logo,
  title,
  text,
  alt,
  date,
  progress,
  company,
  cardId,
}: ICards) => {
  return (
    <>
      <div
        className={`flex sm:flex-row flex-col gap-5 sm:items-center sm:justify-between ${styles.categoryCard} px-10`}
      >
        <div>
          <Image src={"/img/logo.svg"} alt={`${alt}`} width={50} height={50} />{" "}
          {logo}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className={`${styles.sectionHeadText} text-black`}>
              Title {title}
            </h3>
            <h4
              className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
            >
              Company {company}
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              text {text}
            </h4>
          </div>
          <div className="sm:hidden flex justify-between gap-3">
            {cardId === "recentApply" ? (
              <>
                <div>
                  <h4
                    className={`${styles.sectionSubText} text-black font-semibold`}
                  >
                    Date Applied
                  </h4>
                  <p className={`${styles.sectionSubText} text-gray-400`}>
                    24 July 2021 {date}
                  </p>
                </div>
                <div>
                  <TagComp
                    text={`In Review  ${progress}`}
                    textColor="text-[#8a0194]"
                    borderColor="border border-[#8a0194]"
                  />
                </div>
              </>
            ) : (
              <div>
                <h4
                  className={`${styles.sectionSubText} text-black font-semibold`}
                >
                  Date Posted
                </h4>
                <p className={`${styles.sectionSubText} text-gray-400`}>
                  24 July 2021 {date}
                </p>
              </div>
            )}
          </div>
        </div>

        {cardId === "recentApply" ? (
          <>
            <div className="sm:flex flex-col hidden">
              <h4
                className={`${styles.sectionSubText} text-black font-semibold`}
              >
                Date Applied
              </h4>
              <p className={`${styles.sectionSubText} text-gray-400`}>
                24 July 2021 {date}
              </p>
            </div>
            <div className="hidden sm:block">
              <TagComp
                text={`In Review  ${progress}`}
                textColor="text-[#8a0194]"
                borderColor="border border-[#8a0194]"
              />
            </div>
          </>
        ) : (
          <div className="sm:flex flex-col hidden">
            <h4 className={`${styles.sectionSubText} text-black font-semibold`}>
              Date Posted
            </h4>
            <p className={`${styles.sectionSubText} text-gray-400`}>
              24 July 2021 {date}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentCard;
