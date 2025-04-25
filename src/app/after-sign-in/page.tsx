"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getDashboardPath } from "../../Lib/client/user";
import Loader from "../components/Loader";

function AfterSignIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyRegisteredUser = useCallback(async () => {
    try {
      const userResponse = await fetch("/api/user/get-user-by-clerk-id");

      if (!userResponse.ok) {
        throw new Error(`Failed to get userid: ${userResponse.statusText}`);
      }

      const user = await userResponse.json();
      if (user) {
        router.push(getDashboardPath(user.role));
      } else {
        const roleResponse = await fetch("/api/user/get-role");
        if (!roleResponse.ok) {
          throw new Error(`Failed to get role: ${roleResponse.statusText}`);
        }

        const role = await roleResponse.json();
        if (!role) {
          router.push("/sign-in");
        }
        router.push(`/register?role=${role}`);
      }
    } catch (error) {
      console.error("Error during sign-in flow:", error);
      setError("An error occurred while fetching the user data.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    verifyRegisteredUser();
  }, [verifyRegisteredUser]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen">
      <Loader redirecting={true} />
    </div>
  );
}

export default AfterSignIn;
