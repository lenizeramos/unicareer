import { styles } from "@/app/styles";
import { ICards } from "@/app/Types";

const CategoryPerks = ({
  icon: Icon,
  subicons: Subicons,
  title,
  text,
  cardId
}: ICards) => {
  return (
    <>
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
    </>
  );
};

export default CategoryPerks;
