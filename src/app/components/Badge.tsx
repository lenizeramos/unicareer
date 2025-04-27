import { IBadge } from "../Types";

export default function Badge({ status, color }: IBadge) {
  const hasStatus = !!status && status.trim() !== "";
  return (
    <div
      className={`inline-block w-fit px-3 py-1 rounded-full ${
        hasStatus ? `border-${color} border-2 text-${color}Color` : ""
      }`}
    >
      {hasStatus ? status : ""}
    </div>
  );
}
