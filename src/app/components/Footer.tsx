"use client";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import ButtonComp from "./ButtonComp";
import Logo from "./Logo";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleOnclick = () => {
    const emailRegex =
      /(^)(([A-Za-z0-9!#-&*--\/=?^_`{|}~][.]{0,1})+@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z0-9]{2,})($)/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        style: {
          background: "#202430",
          borderRadius: "8px",
          padding: "16px",
          color: "#f87171",
        },
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    setEmail("");
    toast(
      <div className="flex items-center gap-3">
        <FaCheckCircle size={28} className="text-green-700" />
        <p className="text-[18px] text-gray-300 font-shafarik">
          You have successfully subscribed.
        </p>
      </div>,
      {
        style: {
          background: "#202430",
          borderRadius: "8px",
          padding: "16px",
        },
        duration: 3000,
        position: "top-center",
      }
    );
  };
  return (
    <footer className="bg-landingDark text-gray-300 md:p-15 p-10 text-left font-shafarik">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-start wide-column gap-5">
          <Logo isLanding={true} />
          <p className="font-shafarik max-w-xs text-justify">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>
        <div className="narrow-column xs:mx-auto">
          <h4 className="font-bold font-monomakh text-span">About</h4>
          <ul className="list-none flex flex-col gap-2">
            <li>Companies</li>
            <li>Pricing</li>
            <li>Terms</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="subscribe wide-column lg:flex flex-col items-start gap-4 hidden">
          <h4 className="font-bold mb-4 font-monomakh text-span">
            Get job notifications
          </h4>
          <p>The latest job news, articles, sent to your inbox weekly.</p>
          <div className="flex flex-col md:flex-row justify-center gap-2 subscribe-form w-full">
            <input
              className="p-2 border border-gray-300 w-full md:w-52 bg-white text-black"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ButtonComp
              text="Subscribe"
              IsWhite={false}
              onClick={handleOnclick}
            />
          </div>
        </div>
      </div>
      <div className="subscribe wide-column flex flex-col items-start gap-4 lg:hidden mt-8">
        <h4 className="font-bold font-monomakh text-span">
          Get job notifications
        </h4>
        <p>The latest job news, articles, sent to your inbox weekly.</p>
        <div className="flex flex-col xs:flex-row items-center xs:items-start gap-2 subscribe-form w-full">
          <input
            className="p-2 border border-gray-300 w-52 bg-white text-black"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ButtonComp
            text="Subscribe"
            IsWhite={false}
            onClick={handleOnclick}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 pt-10 border-t border-gray-600 bottom-container flex-col sm:flex-row gap-5">
        <div className="copyright">
          <p>2025 @ UniCareer. All rights reserved.</p>
        </div>
        <div className="social-icons flex items-center gap-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80"
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80"
          >
            <FaXTwitter className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
