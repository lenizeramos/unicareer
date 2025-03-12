import { styles } from "../styles";
import { IButtton } from "../Types";

const ButtonComp = ({ text, IsWhite, width, onClick, icon }: IButtton) => {
  const colorBtn = IsWhite ? "bg-white border border-primary" : "bg-primary";
  const colorText = IsWhite ? "text-primary" : "text-white";
  const widthBtn = width ? `${width}` : `w-fit`;
  return (
    <>
      <button
        className={`${colorText} ${colorBtn} ${widthBtn} ${styles.button} flex flex-row items-center gap-2`}
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    </>
  );
};

export default ButtonComp;
