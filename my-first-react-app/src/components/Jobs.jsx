import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ role: '', location: '', experience: '' });
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { id: 'user123', role: 'applicant' };
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const storedBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${currentUser.id}`) || '[]');
    const storedApplications = JSON.parse(localStorage.getItem(`applications_${currentUser.id}`) || '[]');
    setJobs(storedJobs);
    setBookmarkedJobs(storedBookmarks);
    setApplications(storedApplications);
  }, [currentUser.id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.role || job.title.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.experience || job.experience.toLowerCase().includes(filters.experience.toLowerCase()))
    );
  });

  const handleBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.includes(jobId)
      ? bookmarkedJobs.filter((id) => id !== jobId)
      : [...bookmarkedJobs, jobId];
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem(`bookmarks_${currentUser.id}`, JSON.stringify(updatedBookmarks));
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Browse Jobs</h2>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          placeholder="Filter by role (e.g., Developer)"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Filter by location (e.g., Remote)"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          name="experience"
          value={filters.experience}
          onChange={handleFilterChange}
          placeholder="Filter by experience (e.g., Mid Level)"
          className="p-2 border rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="border p-4 rounded-lg shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company} - {job.location}</p>
              <p className="text-gray-600">Experience: {job.experience}</p>
              <p className="text-gray-600">Salary: {job.salary}</p>
              <div className="mt-4 flex space-x-4">
                <Link
                  to={`/job/${job.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleBookmark(job.id)}
                  className={`px-4 py-2 rounded-lg ${
                    bookmarkedJobs.includes(job.id)
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {bookmarkedJobs.includes(job.id) ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Applications</h3>
        {applications.length > 0 ? (
          <ul className="space-y-4">
            {applications.map((app) => {
              const job = jobs.find((j) => j.id === app.jobId);
              return (
                <li key={app.id} className="border p-4 rounded-lg">
                  <p>
                    <strong>Job:</strong> {job ? job.title : 'Unknown'} at {job ? job.company : 'Unknown'}
                  </p>
                  <p>
                    <strong>Status:</strong> {app.status}
                  </p>
                  <p>
                    <strong>Applied:</strong> {new Date(app.timestamp).toLocaleDateString()}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No applications submitted yet.</p>
        )}
      </div>
    </section>
  );
};

export default Jobs;