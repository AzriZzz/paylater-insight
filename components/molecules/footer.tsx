import React from "react";
import { FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer flex justify-between mt-4 pb-5">
      <p className="text-sm">PayLater Insight © 2023 </p>
      <div className="flex gap-5">
        <a
          href="https://github.com/AzriZzz/spaylater-insight"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Twitter"
        >
          <FaGithub />
        </a>
        <address className="not-italic">
          <a href="mailto:muhdazri.biz@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </address>
        <a
          href="https://twitter.com/AzriZzz"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
