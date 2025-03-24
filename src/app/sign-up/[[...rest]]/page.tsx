"use client";
import { useEffect, useState } from "react";
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import ButtonComp from "@/app/components/ButtonComp";
import Link from "next/link";

const SignUpPage = () => {
  const [role, setRole] = useState<"company" | "candidate" >("candidate");
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/after-sign-in");
    }
  }, [isSignedIn, router]);
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
          <div className="p-10 flex flex-col justify-center">
            <Logo fontSize="text-5xl" logoSize={60}/>
            <h1 className="mt-4 text-2xl font-bold mb-4">Join Our Platform</h1>
            <p className="text-gray-600 mb-6">Create an account to get started. Select your role to continue.</p>

            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium text-gray-800">I want to join as:</h3>
              <div className="flex gap-3">
                <ButtonComp
                  text="Candidate"
                  IsWhite={role !== "candidate"}
                  width="w-full"
                  onClick={() => setRole("candidate")}
                />
                <ButtonComp
                  text="Company"
                  IsWhite={role !== "company"}
                  width="w-full"
                  onClick={() => setRole("company")}
                />
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Already have an account?
              <Link href="/sign-in" className="font-semibold text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <div className="p-10 flex items-center justify-center bg-gray-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SignUp
                  path="/sign-up"
                  routing="path"
                  signInUrl="/sign-in"
                  forceRedirectUrl={`/register?role=${role}`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );

};

export default SignUpPage;
