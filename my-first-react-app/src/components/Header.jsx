import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-300 transition-colors">
          CareerPrep
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            to="/jobs"
            className="text-lg font-medium hover:text-blue-300 hover:scale-105 transform transition-all duration-200 relative group"
          >
            Jobs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/interview-upload"
            className="text-lg font-medium hover:text-blue-300 hover:scale-105 transform transition-all duration-200 relative group"
          >
            Post Interview
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/add-notes"
            className="text-lg font-medium hover:text-blue-300 hover:scale-105 transform transition-all duration-200 relative group"
          >
            Add Notes
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/browse-notes"
            className="text-lg font-medium hover:text-blue-300 hover:scale-105 transform transition-all duration-200 relative group"
          >
            Browse Notes
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/login"
            className="text-lg font-medium hover:text-blue-300 hover:scale-105 transform transition-all duration-200 relative group"
          >
            Post a Job
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{currentUser.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 px-4 py-4">
          <Link
            to="/jobs"
            className="block py-2 text-lg font-medium hover:text-blue-300 transition-colors"
            onClick={toggleMenu}
          >
            Jobs
          </Link>
          <Link
            to="/interview-upload"
            className="block py-2 text-lg font-medium hover:text-blue-300 transition-colors"
            onClick={toggleMenu}
          >
            Post Interview
          </Link>
          <Link
            to="/add-notes"
            className="block py-2 text-lg font-medium hover:text-blue-300 transition-colors"
            onClick={toggleMenu}
          >
            Add Notes
          </Link>
          <Link
            to="/browse-notes"
            className="block py-2 text-lg font-medium hover:text-blue-300 transition-colors"
            onClick={toggleMenu}
          >
            Browse Notes
          </Link>
          <Link
            to="/login"
            className="block py-2 text-lg font-medium hover:text-blue-300 transition-colors"
            onClick={toggleMenu}
          >
            Post a Job
          </Link>
          {currentUser ? (
            <div className="py-2">
              <span className="block text-sm font-medium">{currentUser.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block py-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;