import { IContactInfoItemProps } from "@/app/Types";

export default function ContactInfoItem({
  icon,
  value,
}: IContactInfoItemProps) {
  return (
    <li className="flex items-center gap-2 font-shafarik">
      {icon}
      {value || "N/A"}
    </li>
  );
}
