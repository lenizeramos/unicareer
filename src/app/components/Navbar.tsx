"use client";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { signOut, user } = useClerk();
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
    <nav>
      <SignedOut>
        <button onClick={handleOnClick}>Sign-in</button>
      </SignedOut>
      <SignedIn>
        <button onClick={handleSignOut}>Logout</button>
        <UserButton />.
      </SignedIn>
    </nav>
  );
};

export default Navbar;
