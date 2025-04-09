import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const useCandidateData = () => {
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchCompanyData = async () => {
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
          setCandidateId(data.candidateId);
        }
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [getToken]);

  return { candidateId, isLoading };
};