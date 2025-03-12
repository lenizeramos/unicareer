"use client";

import { DashboardType } from "@/app/Types/navigation";

export function getUserByRole(): Promise<DashboardType> {
  return fetch("/api/get-user-by-clerk-id")
    .then((userResponse) => {
      if (!userResponse.ok) {
        console.error("Failed to get user:", userResponse.statusText);
        return null;
      }
      return userResponse.json();
    })
    .then((user) => {
      if (!user) {
        return 'CANDIDATE'; // Default to CANDIDATE if no user found
      }
      
      return fetch("/api/get-role")
        .then(async (roleResponse) => {
          console.log("roleResponse", roleResponse);
          if (!roleResponse.ok) {
            // Get the error message from the response
            const errorText = await roleResponse.text();
            console.error("Failed to get role:", roleResponse.status, errorText);
            return 'CANDIDATE';
          }
          return roleResponse.json();
        })
        .catch((error) => {
          console.error("Error fetching role:", error);
          return 'CANDIDATE'; // Default to CANDIDATE on any error
        });
    })
    .catch((error) => {
      console.error("Error in getUserByRole:", error);
      return 'CANDIDATE'; // Default to CANDIDATE on any error
    });
}