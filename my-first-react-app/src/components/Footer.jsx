import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-300 transition-colors">
              CareerPrep
            </Link>
            <p className="text-sm text-gray-400 mt-2">Empowering your career journey.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            <Link
              to="/about"
              className="text-sm hover:text-blue-300 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact-us"
              className="text-sm hover:text-blue-300 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <p>+91 887878788</p>
            <p>bodhiQ@info.com</p>
            <p>GAchibowli, Hyderabad, India</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} CareerPrep. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;