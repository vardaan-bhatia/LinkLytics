import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="px-20 bg-gray-900 py-20 text-white">
      {/* Footer heading */}
      <div>
        <h1 className="font-extrabold text-2xl mb-4">LinkLytics</h1>
        <p>
          A product by{" "}
          <span className="text-customBlue font-bold">
            <a href="https://www.linkedin.com/in/vardaan-bhatia-028446203/">
              Vardaan Bhatia
            </a>
          </span>
        </p>
      </div>

      {/* Social Links Section */}
      <div className="flex mt-6 space-x-6">
        <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" className="text-customBlue hover:text-white transition" />
        </a>
        <a href="https://www.linkedin.com/in/vardaan-bhatia-028446203/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-customBlue hover:text-white transition" />
        </a>
        <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" className="text-customBlue hover:text-white transition" />
        </a>
        <a href="https://medium.com/@your-profile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faMedium} size="2x" className="text-customBlue hover:text-white transition" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
