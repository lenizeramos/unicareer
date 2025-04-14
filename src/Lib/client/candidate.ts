import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ICandidate } from "@/app/Types/slices";

export const useCandidateData = () => {
  const [candidate, setCandidate] = useState<ICandidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/get-candidate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setCandidate(data);
          console.log("data=>>>", data)
        }
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidateData();
  }, [getToken]);

  return { candidate, isLoading };
};