import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { id: 'user123', role: 'applicant' };
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const foundJob = storedJobs.find((j) => j.id === jobId);
    setJob(foundJob);
  }, [jobId]);

  const handleApply = (e) => {
    e.preventDefault();
    if (currentUser.role !== 'applicant') {
      alert('Only applicants can apply for jobs.');
      return;
    }
    const application = {
      id: uuidv4(),
      jobId,
      userId: currentUser.id,
      coverLetter,
      status: 'Applied',
      timestamp: new Date().toISOString(),
    };
    const existingApplications = JSON.parse(localStorage.getItem(`applications_${currentUser.id}`) || '[]');
    localStorage.setItem(`applications_${currentUser.id}`, JSON.stringify([...existingApplications, application]));
    alert('Application submitted!');
    navigate('/jobs');
  };

  if (!job) return <div>Loading...</div>;

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">{job.title}</h2>
      <p className="text-gray-600"><strong>Company:</strong> {job.company}</p>
      <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-600"><strong>Experience:</strong> {job.experience}</p>
      <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>
      <p className="text-gray-600 mt-4"><strong>Description:</strong></p>
      <p className="text-gray-600">{job.description}</p>
      <form onSubmit={handleApply} className="mt-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Cover Letter</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full p-4 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a brief cover letter..."
            required
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>
      </form>
    </section>
  );
};

export default JobDetails;