import { FaRegCalendarAlt } from "react-icons/fa";
import { IDashboardWelcome } from "../Types";

export default function DashboardWelcome({ greeting, message, date }: IDashboardWelcome) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center lg:p-8 p-4 gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="lg:text-3xl text-2xl text-title-color font-bold font-shafarik">{greeting}</h2>
                <p className="lg:text-xl text-base text-not-focus-color font-monomakh">{message}</p>
            </div>
            <div className="flex items-center gap-2 border-light p-4">
                <p className="text-sm text-title-color font-monomakh">{date}</p>
                <FaRegCalendarAlt color="#4640DE" />
            </div>
        </div>
    )
}