import { ICompanyHeader } from "../Types";
/* import { MdArrowBackIosNew } from "react-icons/md"; */
import { styles } from "../styles";
import ButtonComp from "./ButtonComp";
import Image from "next/image";

export default function CompanyHeader({ image, name, button }: ICompanyHeader) {
    return (
        <div className="flex justify-between items-center p-2 lg:ps-8 pe-8">
            <div className="flex items-center gap-2">
                <Image src={image} alt={name} width={60} height={60} />
                <div className="flex flex-col">
                    {/* <p className="text-sm text-gray-500">Company</p> */}
                    <h2 className={`text-md ${styles.subTitleSectionSize} font-[600] text-landingDark`}>{name}</h2>
                </div>
            </div>
            {button ? <ButtonComp text={button.text} IsWhite={button.IsWhite} icon={button.icon} onClick={button.onClick} /> : <div></div>}
        </div>
    )
}