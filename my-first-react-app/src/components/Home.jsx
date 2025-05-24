import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Hero from './Hero';

const Home = () => {
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch jobs from localStorage and sort by timestamp (most recent first)
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 3); // Limit to top 3 trending jobs

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }

    const subscriber = {
      id: uuidv4(),
      email,
      timestamp: new Date().toISOString(),
    };

    const existingSubscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    localStorage.setItem('newsletterSubscribers', JSON.stringify([...existingSubscribers, subscriber]));
    setSuccess('Thank you for subscribing!');
    setError('');
    setEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Trending Jobs Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Trending Jobs</h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link
                key={job.id}
                to={`/job/${job.id}`}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-1">{job.company}</p>
                <p className="text-gray-600 mb-1">{job.location}</p>
                <p className="text-gray-800 font-medium">{job.salary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No trending jobs available.</p>
        )}
      </section>

      {/* Newsletter Subscription Section */}
      <section className="container mx-auto px-4 py-12 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center">Get Tips & Stories in Your Inbox</h2>
        <p className="text-center text-gray-600 mb-8">Subscribe to receive the latest interview tips and success stories.</p>
        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
        </form>
      </section>
    </div>
  );
};

export default Home;