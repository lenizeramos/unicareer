import Image from "next/image";
import { ILogo } from "../Types";

const Logo = ({ logoSize, fontSize, isBgDark }: ILogo) => {
  const size = logoSize ? logoSize : 40;
  const fontsize = fontSize ? fontSize : "text-3xl";

  return (
    <>
      <div className={`flex items-center gap-2`}>
        <Image src={"/img/logo.svg"} alt="logo" width={size} height={size} />
        <h1
          className={`font-bigShoulderStencil ${fontsize} ${
            isBgDark ? "logo-gradient-dark" : "logo-gradient"
          } font-medium`}
        >
          UniCareer
        </h1>
      </div>
    </>
  );
};

export default Logo;
