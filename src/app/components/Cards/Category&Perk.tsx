import { styles } from "@/app/styles";
import { ICards } from "@/app/Types";

const CategoryPerks = ({ icon: Icon, subicons: Subicons, title, text }: ICards) => {
    return (
      <>
        <div
          className={`bg-white p-5 text-primary hover:bg-primary ${styles.sectionSubText} rounded-xl cursor-pointer group`}
        >
          <div>{Icon && <Icon className={`${styles.iconsCards} group-hover:text-white`} />}</div>
          <div>
            <h3 className={`text-xl font-bold my-5 text-black group-hover:text-white `}>{title}</h3>
            <div className="flex items-center gap-5 text-gray-400">
              <p className={`group-hover:text-white`}>{text} </p>
              {Subicons && <Subicons className={`${styles.subIconsCards} group-hover:text-white`} />}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CategoryPerks;