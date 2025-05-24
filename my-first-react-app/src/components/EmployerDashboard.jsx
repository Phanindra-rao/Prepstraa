import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    experience: '',
    company: '',
  });
  const [selectedJobId, setSelectedJobId] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { id: 'employer123', role: 'employer' };

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]').filter(
      (job) => job.employerId === currentUser.id
    );
    setJobs(storedJobs);
  }, [currentUser.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: uuidv4(),
      employerId: currentUser.id,
      ...formData,
      timestamp: new Date().toISOString(),
    };
    const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    localStorage.setItem('jobs', JSON.stringify([...existingJobs, newJob]));
    setJobs([...jobs, newJob]);
    setFormData({ title: '', description: '', salary: '', location: '', experience: '', company: '' });
    console.log('Job Posted:', newJob);
  };

  const getApplicationsForJob = (jobId) => {
    const allApplications = [];
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.forEach((user) => {
      if (user.role === 'applicant') {
        const userApplications = JSON.parse(localStorage.getItem(`applications_${user.id}`) || '[]');
        userApplications.forEach((app) => {
          if (app.jobId === jobId) {
            allApplications.push({ ...app, applicantName: user.name });
          }
        });
      }
    });
    return allApplications;
  };

  const handleStatusUpdate = (applicationId, userId, newStatus, jobId) => {
    const userApplications = JSON.parse(localStorage.getItem(`applications_${userId}`) || '[]');
    const updatedApplications = userApplications.map((app) =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    localStorage.setItem(`applications_${userId}`, JSON.stringify(updatedApplications));
    setSelectedJobId(null);
    setSelectedJobId(jobId);
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-100 shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Employer Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Post a New Job</h3>
        <form onSubmit={handlePostJob}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location (e.g., Remote, New York)"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Salary (e.g., $100,000)"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Experience (e.g., Mid Level)"
              className="p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Job Description"
              className="w-full p-2 border rounded-lg h-24"
              required
            ></textarea>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Job Listings</h3>
        {jobs.length > 0 ? (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job.id} className="border p-4 rounded-lg">
                <h4 className="text-lg font-medium">{job.title} at {job.company}</h4>
                <p className="text-gray-600">Location: {job.location}</p>
                <p className="text-gray-600">Salary: {job.salary}</p>
                <button
                  onClick={() => setSelectedJobId(job.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Applicants
                </button>
                {selectedJobId === job.id && (
                  <div className="mt-4">
                    <h5 className="text-md font-semibold">Applicants</h5>
                    {getApplicationsForJob(job.id).length > 0 ? (
                      <ul className="space-y-2">
                        {getApplicationsForJob(job.id).map((app) => (
                          <li key={app.id} className="border p-2 rounded-lg">
                            <p><strong>Applicant:</strong> {app.applicantName}</p>
                            <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                            <p><strong>Status:</strong> {app.status}</p>
                            <div className="mt-2 space-x-2">
                              <button
                                onClick={() => handleStatusUpdate(app.id, app.userId, 'Shortlisted', job.id)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                              >
                                Shortlist
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(app.id, app.userId, 'Rejected', job.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-lg"
                              >
                                Reject
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No applicants yet.</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </section>
  );
};

export default EmployerDashboard;