"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

function AfterSignIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyRegisteredUser = useCallback(async () => {
    try {
      const userResponse = await fetch("/api/get-user-by-clerk-id");

      if (!userResponse.ok) {
        throw new Error(`Failed to get userid: ${userResponse.statusText}`);
      }

      const user = await userResponse.json();

      console.log("userAfterSignInPage:", user);

      if (user) {
        console.log("UserId exists, redirecting to home");
        router.push("/");
        return;
      }

      const roleResponse = await fetch("/api/get-role");
      if (!roleResponse.ok) {
        throw new Error(`Failed to get role: ${roleResponse.statusText}`);
      }

      const role = await roleResponse.json();
      console.log("Redirecting to register with role:", role);
      router.push(`/register?role=${role}`);
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
    return <div>Loading...</div>;
  }

  return <div>Redirecting...</div>;
}

export default AfterSignIn;
