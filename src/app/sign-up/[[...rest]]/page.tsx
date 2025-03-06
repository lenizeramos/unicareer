"use client";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
