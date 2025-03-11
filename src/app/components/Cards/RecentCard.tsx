import { styles } from "@/app/styles";
import TagComp from "../TagComp";
import { ICards } from "@/app/Types";
import Image from "next/image";

const RecentCard = ({
  logo,
  subicons: Subicons,
  title,
  subtitle,
  text,
  alt,
  category,
  company,
  cardId,
}: ICards) => {
  return (
    <>
      <div
        className={`flex flex-row gap-5 items-center sm:justify-between justify-center ${styles.categoryCard}`}
      >
        <div>
          <Image src={"/img/logo.svg"} alt={`${alt}`} width={50} height={50} />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className={`${styles.sectionHeadText} text-black`}>Title</h3>
            <h4
              className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
            >
              Company <div className="w-1 h-1 rounded-full bg-gray-400" />
              text
            </h4>
          </div>
          <div className="sm:hidden flex flex-col gap-3">
            <div>
              <h4
                className={`${styles.sectionSubText} text-black font-semibold`}
              >
                Date Applied
              </h4>
              <p className={`${styles.sectionSubText} text-gray-400`}>
                24 July 2021
              </p>
            </div>
            <div>
              <TagComp
                text="In Review"
                textColor="text-[#8a0194]"
                borderColor="border border-[#8a0194]"
              />
            </div>
          </div>
        </div>
        <div className="sm:flex flex-col hidden">
          <h4 className={`${styles.sectionSubText} text-black font-semibold`}>
            Date Applied
          </h4>
          <p className={`${styles.sectionSubText} text-gray-400`}>
            24 July 2021
          </p>
        </div>
        <div className="hidden sm:block">
          <TagComp
            text="In Review"
            textColor="text-[#8a0194]"
            borderColor="border border-[#8a0194]"
          />
        </div>
      </div>
    </>
  );
};

export default RecentCard;
