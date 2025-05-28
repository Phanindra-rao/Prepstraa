import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ isAdmin }) => {
  return (
    <section className="bg-teal-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Your Learning Platform
        </h1>
        <p className="text-xl mb-8">
          Explore programming notes, solutions, and interview prep.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/stories"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Explore Stories
          </Link>
          <Link
            to="/add-notes"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Add Notes
          </Link>
          <Link
            to="/solutions"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Solutions
          </Link>
          <Link
            to="/all-notes"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            All Notes
          </Link>
          <Link
            to="/browse-notes"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Interview Notes
          </Link>
          <Link
            to="/post-interview"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Post Interview
          </Link>
          {isAdmin && (
            <Link
              to="/admin-upload"
              className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Admin Upload
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;