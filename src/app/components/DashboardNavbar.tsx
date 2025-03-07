import { IDashboardNavbar } from "../Types";
import { MdArrowBackIosNew } from "react-icons/md";
import { styles } from "../styles";
import ButtonComp from "./ButtonComp";
import Link from "next/link";

export default function DashboardNavbar({ title, backArrow, button }: IDashboardNavbar) {
    return (
        <div className="flex justify-between items-center p-8">
            <div className={`${backArrow ? "flex items-center gap-2" : ""}`}>
                {backArrow ? <Link href="/"><MdArrowBackIosNew /></Link> : <div></div>}
                <h1 className={`${styles.dashboardTitle}`}>{title}</h1>
            </div>
            {button ? <ButtonComp text={button.text} IsWhite={button.IsWhite} /> : <div></div>}
        </div>
    )
}