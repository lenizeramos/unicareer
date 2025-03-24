"use client";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import ButtonComp from './ButtonComp';
import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { signOut, user } = useClerk();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleOnClick = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/menu");
    }
  };

  return (
    <nav className="w-full flex justify-between items-center bg-[#202430] px-5 py-2.5 relative">
      <div>
        <Link href={'/'}>
          <Logo isBgDark={false} />
        </Link>
      </div>

      <div className="hidden md:flex gap-5">
        <a
          href="#find-jobs"
          className="text-white hover:text-[#6a5acd] text-base"
        >
          Find Jobs
        </a>
        <a
          href="#browse-companies"
          className="text-white hover:text-[#6a5acd] text-base"
        >
          Browse Companies
        </a>
      </div>

      <div className="hidden md:flex items-center gap-2.5">
        <SignedOut>
          <button
            onClick={handleOnClick}
            className="text-white hover:text-[#6a5acd] text-base"
          >
            Sign In
          </button>
          <ButtonComp text="Sign Up" IsWhite={false} width="w-[120px]" />
        </SignedOut>
        <SignedIn>
          <button
            onClick={handleSignOut}
            className="text-white hover:text-[#6a5acd] text-base"
          >
            Logout
          </button>
          <UserButton />
        </SignedIn>
      </div>

      <div
        className={`md:hidden flex flex-col gap-1 cursor-pointer z-10 ${
          isMenuOpen ? "open" : ""
        }`}
        onClick={toggleMenu}
      >
        <span
          className={`w-[25px] h-[3px] bg-white transition-all origin-center ${
            isMenuOpen ? "transform translate-y-[7px] rotate-45" : ""
          }`}
        ></span>
        <span
          className={`w-[25px] h-[3px] bg-white transition-all ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-[25px] h-[3px] bg-white transition-all origin-center ${
            isMenuOpen ? "transform -translate-y-[7px] -rotate-45" : ""
          }`}
        ></span>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#222] p-5 z-50 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-5">
          <a
            href="#find-jobs"
            className="text-white hover:text-[#6a5acd] text-base"
          >
            Find Jobs
          </a>
          <a
            href="#browse-companies"
            className="text-white hover:text-[#6a5acd] text-base"
          >
            Browse Companies
          </a>
          <SignedOut>
            <button
              onClick={handleOnClick}
              className="text-white hover:text-[#6a5acd] text-base"
            >
              Sign In
            </button>
            <ButtonComp text="Sign Up" IsWhite={false} width="w-[120px]" />
          </SignedOut>
          <SignedIn>
            <button
              onClick={handleSignOut}
              className="text-white hover:text-[#6a5acd] text-base"
            >
              Logout
            </button>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
