import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AllNotes from './components/AllNotes';
import BrowseNotes from './components/BrowseNotes';
import CPage from './components/componentsallnotes/CPage';
import CSharpPage from './components/componentsallnotes/CSharpPage';
import PythonPage from './components/componentsallnotes/PythonPage';
import AdminUpload from './components/AdminUpload';
import AdminLogin from './components/AdminLogin';
import AdminManageUploads from './components/AdminManageUploads';
import ProtectedRoute from './components/ProtectedRoute';
import Jobs from './components/Jobs';
import Header from './components/Header';
import Footer from './components/Footer';
import PostInterviewQuestions from './components/PostInterviewQuestions';
import ExploreStories from './components/ExploreStories';
import AddNotes from './components/AddNotes';
import Solutions from './components/Solutions'; 
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-notes" element={<AllNotes />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/browse-notes" element={<BrowseNotes />} />
            <Route path="/post-interview" element={<PostInterviewQuestions />} />
            <Route path="/stories" element={<ExploreStories />} />
            <Route path="/add-notes" element={<AddNotes />} />
            <Route path="/c" element={<CPage />} />
            <Route path="/csharp" element={<CSharpPage />} />
            <Route path="/python" element={<PythonPage />} />
            <Route path="/jobs" element={<Jobs />} />
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
              path="/admin-manage-uploads"
              element={
                <ProtectedRoute>
                  <AdminManageUploads />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;