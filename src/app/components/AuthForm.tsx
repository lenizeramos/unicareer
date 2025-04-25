"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import ButtonComp from "@/app/components/ButtonComp";
import Link from "next/link";
import { AuthFormProps } from "../Types";

const AuthForm = ({ type, role, onRoleChange }: AuthFormProps) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push(
        type === "sign-in" ? "/after-sign-in" : `/register?role=${role}`
      );
    }
  }, [isSignedIn, router, type, role]);

  const signInContent = {
    title: "Welcome back!",
    subtitle: "Sign in to continue",
    text: "",
    linkText: "Don't have an account?",
    linkUrl: "/sign-up",
    linkLabel: "Sign up",
  };

  const signUpContent = {
    title: "Join Our Platform",
    subtitle: "Ready to dive in?",
    text: "Just create your account and pick your role to keep going.",
    linkText: "Already have an account?",
    linkUrl: "/sign-in",
    linkLabel: "Sign in",
  };

  const content = type === "sign-in" ? signInContent : signUpContent;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row bg-white">
          <div className="lg:p-10 md:p-8 xs:p-10 p-5 flex flex-col justify-center gap-5 w-fit mx-auto">
            <Logo
              fontSize="xs:text-5xl text-3xl"
              logoSize={60}
              isLanding={false}
              logoSmallScreen={50}
            />
            <h1 className="lg:text-3xl md:text-2xl xs:text-3xl text-2xl font-bold font-monomakh text-gray-700">
              {content.title}
            </h1>
            <p className="text-gray-400 font-shafarik text-center sm:flex hidden">
              {content.subtitle} {content.text}
            </p>
            <p className="text-gray-400 font-shafarik text-center sm:hidden">
              {content.subtitle} <br />
              {content.text}
            </p>

            {type === "sign-up" ? (
              <div className="">
                <h3 className=" text-gray-400 font-shafarik">
                  I want to join as:
                </h3>
                <div className="flex gap-3 mt-3 mb-1">
                  <ButtonComp
                    text="Candidate"
                    IsWhite={role !== "candidate"}
                    width="w-full btnAuth"
                    onClick={() => onRoleChange?.("candidate")}
                  />
                  <ButtonComp
                    text="Company"
                    IsWhite={role !== "company"}
                    width="w-full btnAuth"
                    onClick={() => onRoleChange?.("company")}
                  />
                </div>
                <p className="text-sm text-gray-600 font-shafarik">
                  {content.linkText}&nbsp;
                  <Link
                    href={content.linkUrl}
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    {content.linkLabel}
                  </Link>
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600 font-shafarik">
                {content.linkText}&nbsp;
                <Link
                  href={content.linkUrl}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  {content.linkLabel}
                </Link>
              </p>
            )}
          </div>

          <div className="lg:p-10 sm:p-4 flex items-center justify-center font-shafarik">
            <AnimatePresence mode="wait">
              <motion.div
                key={type + (role || "")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {type === "sign-in" ? (
                  <SignIn
                    path="/sign-in"
                    routing="path"
                    signUpUrl="/sign-up"
                    forceRedirectUrl="/after-sign-in"
                  />
                ) : (
                  <SignUp
                    path="/sign-up"
                    routing="path"
                    signInUrl="/sign-in"
                    forceRedirectUrl={`/register?role=${role}`}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
