import { styles } from "../styles";
import { IButtton } from "../Types";

const ButtonComp = ({
  text,
  IsWhite,
  width,
  onClick,
  icon,
  isDissable,
}: IButtton) => {
  const colorBtn = IsWhite
    ? "bg-white border border-[#4640de]"
    : "bg-[#4640de]";
  const colorText = IsWhite ? "text-[#4640de]" : "text-white";
  const widthBtn = width ? `${width}` : `w-fit`;
  return (
    <>
      <button
        className={`${colorText} ${colorBtn} ${widthBtn} flex flex-row justify-center items-center gap-2 xs:text-base text-[12px] ${
          isDissable ? styles.buttonDisable : styles.button
        }`}
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    </>
  );
};

export default ButtonComp;
