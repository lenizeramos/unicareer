import { redirect } from "next/navigation";

async function SSOCalback() {
  redirect("/sign-in");
}

export default SSOCalback;
