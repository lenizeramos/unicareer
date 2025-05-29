"use client";
import { useState } from "react";
import AuthForm from "@/app/components/AuthForm";

const SignUpPage = () => {
  const [role, setRole] = useState<"company" | "candidate">("candidate");

  return (
    <AuthForm 
      type="sign-up" 
      role={role} 
      onRoleChange={setRole} 
    />
  );
};

export default SignUpPage;