import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import ButtonComp from './ButtonComp';

const Footer = () => {
    return (
        <footer className="bg-[#202430] text-[#d6ddeb] py-10 px-20 text-left">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-start wide-column">
                    <div className="flex items-center gap-2 logo-container-inner">
                        <img 
                            src="/img/logo.svg"
                            alt="JobHuntly Logo"
                            className="w-12 mb-4"
                        />
                        <span className="font-bold text-xl app-name">UniCareer</span>
                    </div>
                    <p className="description max-w-xs">
                        Great platform for the job seeker that passionate about startups. Find your dream job easier.
                    </p>
                </div>
                <div className="narrow-column">
                    <h4 className="font-bold mb-4">About</h4>
                    <ul className="list-none flex flex-col gap-2">
                        <li>Companies</li>
                        <li>Pricing</li>
                        <li>Terms</li>
                        <li>Advice</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="narrow-column">
                    <h4 className="font-bold mb-4">Resources</h4>
                    <ul className="list-none flex flex-col gap-2">
                        <li>Help Docs</li>
                        <li>Guide</li>
                        <li>Updates</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="subscribe wide-column flex flex-col items-start gap-4">
                    <h4 className="font-bold mb-4">Get job notifications</h4>
                    <p>The latest job news, articles, sent to your inbox weekly.</p>
                    <div className="flex flex-col md:flex-row justify-center gap-2 subscribe-form w-full">
                        <input className="p-2 border border-gray-300 w-full md:w-52 bg-white text-black" type="email" placeholder="Email Address" />
                        <ButtonComp text="Subscribe" IsWhite={false} className="w-full md:w-auto" />
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-10 pt-10 border-t border-gray-600 bottom-container">
                <div className="copyright">
                    <p>2025 @ UniCareer. All rights reserved.</p>
                </div>
                <div className="social-icons flex items-center gap-8">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80">
                        <FaFacebook className="text-2xl" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80">
                        <FaInstagram className="text-2xl" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80">
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80">
                        <FaXTwitter className="text-2xl" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;