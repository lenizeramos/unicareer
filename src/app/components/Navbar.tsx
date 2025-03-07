"use client";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import '../Types/styles/navbar.css';
import ButtonComp from './ButtonComp';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img 
                    src="/img/logo.svg" 
                    alt="UniCareer Logo" 
                    className="logo-icon" 
                    onClick={() => router.push('/')}
                    style={{ cursor: 'pointer' }}
                />
                <span 
                    className="logo-text"
                    onClick={() => router.push('/')}
                    style={{ cursor: 'pointer' }}
                >UniCareer</span>
            </div>
            
            <div className="navbar-links desktop">
                <a href="#find-jobs" className="nav-link">Find Jobs</a>
                <a href="#browse-companies" className="nav-link">Browse Companies</a>
            </div>
            <SignedOut>
              <div className="navbar-auth desktop">
                <a onClick={handleOnClick} className="nav-link">Login</a>
                <ButtonComp text="Sign Up" IsWhite={false} width="w-[120px]" onClick={() => router.push("/sign-up")}/>
              </div>
            </SignedOut>
            <SignedIn>
              <button onClick={handleSignOut}>Logout</button>
              <UserButton />
            </SignedIn>
            

            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
                <div className="mobile-menu-links">
                    <a href="#find-jobs" className="nav-link">Find Jobs</a>
                    <a href="#browse-companies" className="nav-link">Browse Companies</a>
                    
                    <SignedOut>
                      <div className="navbar-auth desktop">
                        <a href="#login" className="nav-link">Login</a>
                        <ButtonComp text="Sign Up" IsWhite={false} width="w-[120px]" onClick={() => router.push("/sign-up")}/>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <button onClick={handleSignOut}>Logout</button>
                      <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
