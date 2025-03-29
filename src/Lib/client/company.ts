import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const useCompanyData = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);
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

        const response = await fetch('/api/company/get-company', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setCompanyId(data.companyId);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [getToken]);

  return { companyId, isLoading };
};