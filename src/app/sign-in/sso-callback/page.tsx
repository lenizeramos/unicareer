import { redirect } from "next/navigation";

async function SSOCalback() {
  redirect("/sign-up");
}

export default SSOCalback;
