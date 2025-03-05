import { styles } from "../styles";
import { IButtton } from "../Types";

const ButtonComp = ({ text, IsWhite, width }: IButtton) => {
  const colorBtn = IsWhite ? "bg-white" : "bg-[#4640de]";
  const colorText = colorBtn === "bg-white" ? "text-black" : "text-white";
  const widthBtn = width ? `${width}` : `w-fit`;
  return (
    <>
      <button
        className={`${colorText} ${colorBtn} ${widthBtn} ${styles.button}`}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonComp;
