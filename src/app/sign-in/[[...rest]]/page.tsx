"use client";

import { SignIn } from "@clerk/nextjs";
import { styles } from "../../styles";
import Logo from "@/app/components/Logo";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:items-start">
          <Logo fontSize="text-5xl" logoSize={60} />
          <h2 className="mt-4 text-2xl font-semibold">Welcome back!</h2>
          <p className="mt-2 text-lg opacity-80">Sign in to continue</p>
        </div>

        <div className="flex w-full items-center justify-center p-8 md:w-1/2">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            forceRedirectUrl="/after-sign-in"
            appearance={{
              elements: {
                formButtonPrimary: `${styles.button}`,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
