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
          className={` ${styles.sectionSubText} ${styles.categoryCard} w-fit min-h-[160px] min-w-[200px] overflow-hidden relative`}
        >
          <h2 className="text-black font-semibold text-xl">{title}</h2>
          <p className="text-black text-[5rem] font-bigShoulderStencil w-fit ml-7">{total}</p>
            {Icon && (
              <Icon size={80} className={`absolute left-25 top-18 z-10 text-gray-400`} />
            )}
            {Subicons && (
              <Subicons size={90} className={`absolute left-30 top-30 text-gray-400`} />
            )}
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
              <p className={`group-hover:text-white`}>{text} jobs available</p>
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
