"use client";

import { SignIn } from "@clerk/nextjs";
import Logo from "@/app/components/Logo";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:items-start">
          <Logo fontSize="text-5xl" logoSize={60} />
          <h2 className="mt-4 text-2xl font-semibold">Welcome back!</h2>
          <p className="mt-2 text-lg opacity-80">Sign in to continue</p>
          <p className="text-sm text-gray-600 mt-2">
            Don&apos;t have an account?
            <Link
              href="/sign-up"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <div className="flex w-full items-center justify-center p-8 md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key="signIn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                forceRedirectUrl="/after-sign-in"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
