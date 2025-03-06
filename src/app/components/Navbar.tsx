"use client"

import { useState } from 'react';
import '../Types/styles/navbar.css';
import ButtonComp from './ButtonComp';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/img/logo.svg" alt="UniCareer Logo" className="logo-icon" />
                <span className="logo-text">UniCareer</span>
            </div>
            
            <div className="navbar-links desktop">
                <a href="#find-jobs" className="nav-link">Find Jobs</a>
                <a href="#browse-companies" className="nav-link">Browse Companies</a>
            </div>
            <div className="navbar-auth desktop">
                <a href="#login" className="nav-link">Login</a>
                <ButtonComp text="Sign Up" IsWhite={false} width="w-[120px]" />
            </div>

            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
                <div className="mobile-menu-links">
                    <a href="#find-jobs" className="nav-link">Find Jobs</a>
                    <a href="#browse-companies" className="nav-link">Browse Companies</a>
                    <a href="#login" className="nav-link">Login</a>
                    <ButtonComp text="Sign Up" IsWhite={false} width="w-[120px]" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
