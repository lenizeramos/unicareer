"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import CandidateForm from "../components/CandidateForm";
import CompanyForm from "../components/CompanyForm";

export default function SetRolePage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [formType, setFormType] = useState<"candidate" | "company" | null>(
    null
  );

  useEffect(() => {
    if (role === "candidate" || role === "company") {
      setFormType(role);
    } else {
      setFormType(null);
    }
    const setRole = async () => {
      try {
        const response = await fetch("/api/set-role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        });

        if (!response.ok) {
          throw new Error(`Failed to set role: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error setting role:", error);
      }
    };

    setRole();
  }, [role]);

  const handleCandidateFormSubmit = useCallback(async (formData: {
    firstName: string;
    lastName: string;
    photo: File | null;
  }) => {
    console.log("Candidate Form Data:", formData);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Registration error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("User registered successfully!", data);
    } catch (error) {
      console.error("Error registering the user:", error);
      
      
    }
  }, []);

  const handleCompanyFormSubmit = useCallback(async (formData: {
    companyName: string;
    logo: File | null;
    bio: string;
  }) => {
    console.log("Company Form Data:", formData);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Registration Form
        </h1>

        {formType === "candidate" && (
          <CandidateForm onSubmit={handleCandidateFormSubmit} />
        )}
        {formType === "company" && (
          <CompanyForm onSubmit={handleCompanyFormSubmit} />
        )}
        {formType === null && <p>Invalid role or missing parameter.</p>}
      </div>
    </div>
  );
}
