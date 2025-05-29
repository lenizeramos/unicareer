import { IContactInfoItemProps } from "@/app/Types";

export default function ContactInfoItem({
  icon,
  value,
}: IContactInfoItemProps) {
  return (
    <li className="flex items-center gap-2 font-shafarik">
      {icon}
      <a
        href={value.startsWith("http") ? value : `mailto:${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
      >
        {value || "N/A"}
      </a>
    </li>
  );
}
