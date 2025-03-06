import { getRole } from "../../utils/roles";

async function AfterSignin() {
  

  const role = await getRole()

  console.log(role, "ROLEEEEEEEEEEEEEEEEEE")

  return <div>page</div>;
}

export default AfterSignin;
