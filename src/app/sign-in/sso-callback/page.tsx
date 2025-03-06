import { getRole } from "@/utils/roles";
import { redirect } from "next/navigation";

async function SSOCalback() {
  

  const role = await getRole()

  console.log(role, "ROLEEEEEEEEEEEEEEEEEE")
  redirect("/sign-up")

  return <div>page</div>;
}

export default SSOCalback;
