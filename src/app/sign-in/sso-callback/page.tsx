import { getRole } from "@/utils/roles";
import { redirect } from "next/navigation";

async function AfterSignin() {
  

  const role = await getRole()

  console.log(role, "ROLEEEEEEEEEEEEEEEEEE")
  redirect("/sign-up")

  return <div>page</div>;
}

export default AfterSignin;
