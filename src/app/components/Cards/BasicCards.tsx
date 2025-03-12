import { styles } from "@/app/styles";
import { ICards } from "@/app/Types";

const BasicCards = ({
  icon: Icon,
  subicons: Subicons,
  title,
  text,
  total,
  cardId,
}: ICards) => {
  return (
    <>
      {cardId === "dashboardCard" ? (
        <div
          className={` ${styles.sectionSubText} ${styles.categoryCard} w-full`}
        >
          <h2 className={`text-black font-semibold`}>Title</h2>
          <p className={`text-black text-3xl`}>Number</p>
          <div className="text-3xl text-gray-400 relative w-full h-8">
            {Icon && <Icon className={`absolute right-3 top-0 z-10`} />}
            {Subicons && <Subicons className={`absolute right-0 top-4 `} />}
          </div>
        </div>
      ) : (
        <div
          className={` ${styles.sectionSubText} ${styles.categoryCard} cursor-pointer  hover:bg-primary`}
        >
          <div>
            {Icon && (
              <Icon className={`${styles.iconsCards} group-hover:text-white`} />
            )}
          </div>
          <div>
            <h3
              className={`text-xl font-bold my-5 text-black group-hover:text-white `}
            >
              {title}
            </h3>
            <div className="flex items-center gap-5 text-gray-400">
              <p className={`group-hover:text-white`}>{text} </p>
              {Subicons && (
                <Subicons
                  className={`${styles.subIconsCards} group-hover:text-white`}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicCards;
