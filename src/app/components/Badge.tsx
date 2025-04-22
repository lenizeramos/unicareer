import { IBadge } from "../Types";

export default function Badge({ status, color }: IBadge) {
  const hasStatus = !!status && status.trim() !== "";
  return (
    <div
      className={`p-2 rounded-full ${
        hasStatus ? `border-${color} border-2 text-${color}Color` : ""
      }`}
    >
      {hasStatus ? status : ""}
    </div>
  );
}
