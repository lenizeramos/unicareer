import Image from "next/image";
import { ILogo } from "../Types";

const Logo = ({ logoSize, fontSize, isLanding, logoSmallScreen }: ILogo) => {
  const size =
    logoSmallScreen && logoSize ? logoSmallScreen : logoSize ? logoSize : 40;
  const fontsize = fontSize ? fontSize : "text-3xl";
  const gradient = isLanding ? "logo-gradient-landing" : "logo-gradient";
  return (
    <>
      <div className={`flex items-center gap-2`}>
        <Image src={"/img/logo.svg"} alt="logo" width={size} height={size} className="logo"/>
        <h1
          className={`font-bigShoulderStencil ${fontsize} ${gradient} font-medium`}
        >
          UniCareer
        </h1>
      </div>
    </>
  );
};

export default Logo;
