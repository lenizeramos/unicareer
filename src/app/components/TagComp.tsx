import { ITagComp } from "../Types";

const TagComp = ({ bgColor, textColor, borderColor, text }: ITagComp) => {
  return (
    <>
      <div
        className={`${bgColor} ${textColor} ${borderColor} px-2 py-1 rounded-full text-sm font-shafarik`}
      >
        {text}
      </div>
    </>
  );
};

export default TagComp;
