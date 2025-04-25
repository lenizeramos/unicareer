import { ITagComp } from "../Types";

const TagComp = ({
  bgColor,
  textColor,
  borderColor,
  text,
  onClick,
}: ITagComp) => {
  return (
    <>
      <button
        className={`${bgColor} ${textColor} ${borderColor} px-2 py-1 rounded-full text-sm font-shafarik`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default TagComp;
