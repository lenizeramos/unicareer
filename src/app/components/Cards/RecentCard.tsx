import { styles } from "@/app/styles";
import TagComp from "../TagComp";
import { ICards } from "@/app/Types";
import FileDisplay from "../FileDisplay";

const RecentCard = ({
  logo,
  title,
  text,
  date,
  progress,
  companyname,
  cardId,
  createdAt,
}: ICards) => {
  return (
    <>
      <div
        className={`flex sm:flex-row flex-col gap-5 sm:items-center sm:justify-between ${styles.categoryCard} px-10`}
      >
        <div>
          <FileDisplay
            modelName="companyProfileImage"
            userId={logo || ""}
            width={90}
            height={90}
            className="profile-image-style overflow-hidden"
            fallbackImage={"img/img.png" || ""}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className={`${styles.sectionHeadText} text-black`}>
              {title ?? "Title"}
            </h3>
            <h4
              className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
            >
              {companyname ?? "Company"}
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              {text ?? "text"}
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
                    {date ?? "24 July 2021"}
                  </p>
                </div>
                <div>
                  <TagComp
                    text={`In Review  ${progress ?? "100%"}`}
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
                  {createdAt ?? "24 July 2021"}
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
                {date ?? "24 July 2021"}
              </p>
            </div>
            <div className="hidden sm:block">
              <TagComp
                text={`In Review  ${progress ?? "100%"}`}
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
              {createdAt ?? "24 July 2021"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentCard;
