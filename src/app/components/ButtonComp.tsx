import { styles } from "../styles";
import { IButtton } from "../Types";

const ButtonComp = ({ text, IsWhite, width }: IButtton) => {
  const colorBtn = IsWhite ? "bg-white border border-[#4640de]" : "bg-[#4640de]";
  const colorText = IsWhite ? "text-[#4640de]" : "text-white";
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
