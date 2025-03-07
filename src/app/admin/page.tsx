import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";

export default async function AdminDashboard() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <div className="px-4 py-6">
      <p className="text-xl font-semibold mb-6">
        This is the protected admin dashboard restricted to users with the admin
        role.
      </p>
    </div>
  );
}
