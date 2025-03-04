import React from 'react';
import '../Types/styles/footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="links-container">
                <div className="logo-container wide-column">
                    <div className="logo-container-inner">
                        <img 
                            src="/img/logo.svg"
                            alt="JobHuntly Logo"
                            className="logo"
                        />
                        <span className="app-name">JobHuntly</span>
                    </div>
                    <p className="description">
                        Great platform for the job seeker that passionate about startups. Find your dream job easier.
                    </p>
                </div>
                <div className="narrow-column">
                    <h4 className="footer-heading">About</h4>
                    <ul className="links">
                        <li>Companies</li>
                        <li>Pricing</li>
                        <li>Terms</li>
                        <li>Advice</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="narrow-column">
                    <h4 className="footer-heading">Resources</h4>
                    <ul className="links">
                        <li>Help Docs</li>
                        <li>Guide</li>
                        <li>Updates</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="subscribe wide-column">
                    <h4 className="footer-heading">Get job notifications</h4>
                    <p>The latest job news, articles, sent to your inbox weekly.</p>
                    <div className="subscribe-form">
                        <input className="input" type="email" placeholder="Email Address" />
                        <button className="button">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <div className="copyright">
                    <p>2021 @ JobHuntly. All rights reserved.</p>
                </div>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><span><FaFacebook /></span></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><span><FaInstagram /></span></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><span><FaLinkedin /></span></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span><FaXTwitter /></span></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;