import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "../components/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;
  const client = await clerkClient();
  const users = query
    ? (await client.users.getUserList({ query })).data
    : [];

  return (
    <div className="px-4 py-6">
      <p className="text-xl font-semibold mb-6">
        This is the protected admin dashboard restricted to users with the
        admin role.
      </p>

      <SearchUsers />

      {users.length > 0 ? (
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-gray-600">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </div>
              <div className="text-sm text-gray-500">
                {user.publicMetadata.role as string}
              </div>

              <div className="mt-4 space-x-4">
                <form action={setRole} className="inline-block">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                  >
                    Make Admin
                  </button>
                </form>

                <form action={removeRole} className="inline-block">
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                  >
                    Remove Role
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No users found.</p>
      )}
    </div>
  );
}
