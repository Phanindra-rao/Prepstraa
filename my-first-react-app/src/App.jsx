import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Jobs from './components/Jobs';
import JobDetails from './components/JobDetails';
import EmployerDashboard from './components/EmployerDashboard';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminUpload from './components/AdminUpload';
import AdminManageUploads from './components/AdminManageUploads';
import ProtectedRoute from './components/ProtectedRoute';
import InterviewUpload from './components/InterviewUpload';
import AddNotes from './components/AddNotes';
import BrowseNotes from './components/BrowseNotes';
import ExploreStories from './components/ExploreStories';
import Solutions from './components/Solutions';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:jobId" element={<JobDetails />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin-upload"
              element={
                <ProtectedRoute>
                  <AdminUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-manage"
              element={
                <ProtectedRoute>
                  <AdminManageUploads />
                </ProtectedRoute>
              }
            />
            <Route path="/interview-upload" element={<InterviewUpload />} />
            <Route path="/add-notes" element={<AddNotes />} />
            <Route path="/browse-notes" element={<BrowseNotes />} />
            <Route path="/explore-stories" element={<ExploreStories />} />
            <Route path="/solutions" element={<Solutions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;