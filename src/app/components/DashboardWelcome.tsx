import { FaRegCalendarAlt } from "react-icons/fa";
import { IDashboardWelcome } from "../Types";

export default function DashboardWelcome({ greeting, message, date }: IDashboardWelcome) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl text-title-color font-bold">{greeting}</h2>
                <p className="text-base text-not-focus-color">{message}</p>
            </div>
            <div className="flex items-center gap-2 border-light p-4">
                <p className="text-sm text-title-color">{date}</p>
                <FaRegCalendarAlt color="#4640DE" />
            </div>
        </div>
    )
}