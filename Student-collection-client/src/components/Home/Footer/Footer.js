import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left Section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Science and Technology</h2>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Science and Technology. All Rights Reserved.
            </p>
          </div>

          {/* Center Section */}
          <div className="flex mb-4 md:mb-0">
            <Link
              to="/terms"
              className="text-gray-400 hover:text-gray-200 mx-3 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-gray-200 mx-3 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-gray-200 mx-3 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex space-x-4">
            <Link
              to="/facebook"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <i className="fab fa-facebook-f">facebook</i>
            </Link>
            <Link
              to="/twitter"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <i className="fab fa-twitter">Twitter</i>
            </Link>
            <Link
              to="/instagram"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <i className="fab fa-instagram">instagram</i>
            </Link>
            <Link
              to="/linkedin"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <i className="fab fa-linkedin-in">Linked In</i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
