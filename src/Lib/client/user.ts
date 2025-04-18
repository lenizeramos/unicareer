import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const useTokenClaims = () => {
  const { getToken } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const claims = JSON.parse(atob(token.split(".")[1]));
        setRole(claims?.metadata?.role || null);
      } catch (error) {
        console.error("Error getting token claims:", error);
      }
    };

    fetchClaims();
  }, [getToken]);

  return role;
};

export const parseTokenClaims = (token: string) => {
  try {
    const claims = JSON.parse(atob(token.split(".")[1]));
    return claims?.metadata?.role || null;
  } catch (error) {
    console.error("Error parsing token claims:", error);
    return null;
  }
};

export const useUserRole = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = await getToken();
        if (token) {
          const userRole = parseTokenClaims(token);
          setRole(userRole);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [getToken]);

  return { role, isLoading };
};

export const getDashboardPath = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "/dashboard/adminuser";

    case "CANDIDATE":
      return "/dashboard/candidate";

    case "COMPANY":
      return "/dashboard/company";

    default:
      return "/";
  }
};
