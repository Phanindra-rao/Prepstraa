import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'applicant',
    company: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email, role) => {
    if (role === 'employer') {
      const companyEmailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/;
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = email.split('@')[1];
      return companyEmailRegex.test(email) && !personalDomains.includes(domain);
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, role, company } = formData;

    if (!validateEmail(email, role)) {
      setError(
        role === 'employer'
          ? 'Please use a company email address (e.g., @company.com).'
          : 'Invalid email address.'
      );
      return;
    }

    if (isRegistering) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u) => u.email === email)) {
        setError('Email already registered.');
        return;
      }
      const newUser = {
        id: uuidv4(),
        email,
        password, // In production, hash passwords
        name: name || email.split('@')[0],
        role,
        company: role === 'employer' ? company : null,
      };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      console.log('Registered:', newUser);
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        setError('Invalid email or password.');
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Logged in:', user);
    }

    navigate(formData.role === 'employer' ? '/employer-dashboard' : '/jobs');
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg max-w-md">
      <h2 className="text-3xl font-bold mb-6">{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        {isRegistering && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="applicant">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            {formData.role === 'employer' && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            )}
          </>
        )}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center">
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          className="text-blue-600 hover:underline"
        >
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </section>
  );
};

export default Login;