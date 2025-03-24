"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { useEffect} from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import ButtonComp from "@/app/components/ButtonComp";
import Link from "next/link";

type AuthFormProps = {
  type: "sign-in" | "sign-up";
  role?: "company" | "candidate";
  onRoleChange?: (role: "company" | "candidate") => void;
};

const AuthForm = ({ type, role, onRoleChange }: AuthFormProps) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push(type === "sign-in" ? "/after-sign-in" : `/register?role=${role}`);
    }
  }, [isSignedIn, router, type, role]);

  const signInContent = {
    title: "Welcome back!",
    subtitle: "Sign in to continue",
    linkText: "Don't have an account?",
    linkUrl: "/sign-up",
    linkLabel: "Create one",
  };

  const signUpContent = {
    title: "Join Our Platform",
    subtitle: "Create an account to get started. Select your role to continue.",
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
          <div className="p-10 flex flex-col justify-center w-1/2">
            <Logo fontSize="text-5xl" logoSize={60} />
            <h1 className="mt-4 text-2xl font-bold mb-4">{content.title}</h1>
            <p className="text-gray-600 mb-6">{content.subtitle}</p>

            {type === "sign-up" && (
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-800">
                  I want to join as:
                </h3>
                <div className="flex gap-3">
                  <ButtonComp
                    text="Candidate"
                    IsWhite={role !== "candidate"}
                    width="w-full"
                    onClick={() => onRoleChange?.("candidate")}
                  />
                  <ButtonComp
                    text="Company"
                    IsWhite={role !== "company"}
                    width="w-full"
                    onClick={() => onRoleChange?.("company")}
                  />
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600">
              {content.linkText}
              <Link
                href={content.linkUrl}
                className="font-semibold text-indigo-600 hover:underline"
              >
                {content.linkLabel}
              </Link>
            </p>
          </div>

          <div className="p-10 flex items-center justify-center w-1/2">
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