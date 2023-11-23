import React from "react";
import { FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-[#0c3245] text-white py-12">
      <div className="container flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-0">
        <p className="text-md">PayLater Insight © 2023 </p>
        <div className="flex gap-5 mr-8">
          <a
            href="https://github.com/AzriZzz/spaylater-insight"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Twitter"
          >
            <FaGithub className="text-xl" />
          </a>
          <address className="not-italic">
            <a href="mailto:muhdazri.biz@gmail.com" aria-label="Email">
              <FaEnvelope className="text-xl" />
            </a>
          </address>
          <a
            href="https://twitter.com/AzriZzz"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Twitter"
          >
            <FaTwitter className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
