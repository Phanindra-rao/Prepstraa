import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Learning Platform
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-teal-200">
            Home
          </Link>
          <Link to="/all-notes" className="hover:text-teal-200">
            All Notes
          </Link>
          <Link to="/browse-notes" className="hover:text-teal-200">
            Interview Notes
          </Link>
          <Link to="/post-interview" className="hover:text-teal-200">
            Post Interview
          </Link>
          <Link to="/stories" className="hover:text-teal-200">
            Explore Stories
          </Link>
          <Link to="/add-notes" className="hover:text-teal-200">
            Add Notes
          </Link>
          <Link to="/jobs" className="hover:text-teal-200">
            Jobs
          </Link>
          <Link to="/jobs" className="hover:text-teal-200">
            Post a Job
          </Link>
          <Link to="/admin-login" className="hover:text-teal-200">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;