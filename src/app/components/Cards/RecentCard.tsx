import { styles } from "@/app/styles";
import TagComp from "../TagComp";
import { ICards } from "@/app/Types";
import FileDisplay from "../FileDisplay";
import { monthNames, statusTags } from "@/app/constants";

const RecentCard = ({
  logo,
  title,
  location,
  date,
  progress,
  companyname,
  cardId,
}: ICards) => {
  const getDate = (date: string | undefined | null) => {
    if (!date) {
      return;
    }
    const createDate = new Date(date);
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}, ${createDate.getFullYear()}`;
  };
  return (
    <>
      <div
        className={`flex sm:flex-row flex-col gap-5 sm:items-center sm:justify-evenly ${styles.categoryCard} px-10 bg-white`}
      >
        <div>
          <FileDisplay
            modelName="companyProfileImage"
            userId={logo || ""}
            width={90}
            height={90}
            className="profile-image-style overflow-hidden"
            fallbackImage={"img/img.png"}
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
              {location ?? "text"}
            </h4>
          </div>
          <div className="md:hidden flex justify-between gap-3">
            {cardId === "recentApply" ? (
              <>
                <div>
                  <h4
                    className={`${styles.sectionSubText} text-black font-semibold`}
                  >
                    Date Applied
                  </h4>
                  <p className={`${styles.sectionSubText} text-gray-400`}>
                    {getDate(date) ?? "24 July 2021"}
                  </p>
                </div>
                <div>
                  {
                    <TagComp
                      text={`${
                        statusTags.find(
                          (tag) =>
                            tag.id.toLowerCase() === progress?.toLowerCase()
                        )?.type
                      }`}
                      textColor={`${
                        statusTags.find(
                          (tag) =>
                            tag.id.toLowerCase() === progress?.toLowerCase()
                        )?.styles
                      }`}
                    />
                  }
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
                  {getDate(date)}
                </p>
              </div>
            )}
          </div>
        </div>

        {cardId === "recentApply" ? (
          <>
            <div className="md:flex flex-col hidden">
              <h4
                className={`${styles.sectionSubText} text-black font-semibold`}
              >
                Date Applied
              </h4>
              <p className={`${styles.sectionSubText} text-gray-400`}>
                {getDate(date) ?? "24 July 2021"}
              </p>
            </div>
            <div className="hidden md:block">
              <TagComp
                text={`${
                  statusTags.find(
                    (tag) => tag.id.toLowerCase() === progress?.toLowerCase()
                  )?.type
                }`}
                textColor={`${
                  statusTags.find(
                    (tag) => tag.id.toLowerCase() === progress?.toLowerCase()
                  )?.styles
                }`}
              />
            </div>
          </>
        ) : (
          <div className="md:flex flex-col hidden">
            <h4 className={`${styles.sectionSubText} text-black font-semibold`}>
              Date Posted
            </h4>
            <p className={`${styles.sectionSubText} text-gray-400`}>
              {getDate(date) ?? "24 July 2021"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentCard;
