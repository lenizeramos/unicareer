"use client";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonComp from "./ButtonComp";
import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { signOut, user } = useClerk();
  const userRole = user?.publicMetadata?.role as string;

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
    <nav className="w-full flex justify-between items-center bg-[#202430] px-5 py-2.5 relative font-shafarik">
      <div>
        <Link href={"/"}>
          <Logo logoSize={60} fontSize="text-5xl" isLanding={true}/>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-5">
        <SignedOut>
          <button
            onClick={handleOnClick}
            className="text-gray-200 btn font-bigShoulderStencil text-xl cursor-pointer"
          >
            Sign In
          </button>
          <ButtonComp
            text="Sign Up"
            IsWhite={false}
            width="w-[120px]"
            onClick={() => router.push("/sign-up")}
          />
        </SignedOut>
        <SignedIn>
          <button
            onClick={() => router.push(`/dashboard/${userRole}`)}
            className="text-gray-200 btn font-bigShoulderStencil text-xl cursor-pointer mr-4"
          >
            Dashboard
          </button>
          <button
            onClick={handleSignOut}
            className="text-gray-200 btn font-bigShoulderStencil text-xl cursor-pointer"
          >
            Logout
          </button>
          <div className="scale-150 flex items-center mx-5">
          <UserButton />
          </div>
        </SignedIn>
      </div>

      <div
        className={`md:hidden flex flex-col gap-1 cursor-pointer z-10 ${
          isMenuOpen ? "open" : ""
        }`}
        onClick={toggleMenu}
      >
        <span
          className={`w-[25px] h-[3px] bg-gray-300 transition-all origin-center ${
            isMenuOpen ? "transform translate-y-[7px] rotate-45" : ""
          }`}
        ></span>
        <span
          className={`w-[25px] h-[3px] bg-gray-300 transition-all ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-[25px] h-[3px] bg-gray-300 transition-all origin-center ${
            isMenuOpen ? "transform -translate-y-[7px] -rotate-45" : ""
          }`}
        ></span>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#252937] p-5 z-50 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-5 justify-center items-center">
          <SignedOut>
            <button
              onClick={handleOnClick}
              className="text-gray-200 btn font-bigShoulderStencil text-xl cursor-pointer"
            >
              Sign In
            </button>
            <ButtonComp
              text="Sign Up"
              IsWhite={false}
              width="w-[120px]"
              onClick={() => router.push("/sign-up")}
            />
          </SignedOut>
          <SignedIn>
            <button
              onClick={() => router.push("/dashboard/{")}
              className="text-gray-200 btn font-bigShoulderStencil text-xl cursor-pointer mr-4"
            >
              Dashboard
            </button>
            <button
              onClick={handleSignOut}
              className="text-gray-200 btn font-bigShoulderStencil text-xl cursor-pointer"
            >
              Logout
            </button>
            <div className="">
            <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
