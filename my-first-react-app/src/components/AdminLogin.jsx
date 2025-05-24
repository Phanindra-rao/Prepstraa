import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === '68688686') {
      localStorage.setItem('adminCodeVerified', 'true');
      navigate('/admin-upload');
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg max-w-md">
      <h2 className="text-3xl font-bold mb-6">Admin Access</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Enter Admin Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;