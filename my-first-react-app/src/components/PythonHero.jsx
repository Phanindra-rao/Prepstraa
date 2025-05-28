import React from 'react';

const PythonHero = () => {
  const isAdmin = localStorage.getItem('adminCodeVerified') === 'true';

  const handleAddNotes = () => {
    window.open('/add-notes', '_blank');
  };

  const handleExploreStories = () => {
    window.open('/explore-stories', '_blank');
  };

  const handleSolutions = () => {
    window.open('/solutions', '_blank');
  };

  const handleAllNotes = () => {
    window.open('/all-notes', '_blank');
  };

  const handleBrowseNotes = () => {
    window.open('/browse-notes', '_blank');
  };

  const handleAdminUpload = () => {
    window.open('/admin-upload', '_blank');
  };

  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Ace Python Interview Prep
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleExploreStories}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Explore Stories
          </button>
          <button
            onClick={handleAddNotes}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Add Notes
          </button>
          <button
            onClick={handleSolutions}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Solutions
          </button>
          <button
            onClick={handleAllNotes}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700"
          >
            All Notes
          </button>
          <button
            onClick={handleBrowseNotes}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Browse Notes
          </button>
          {isAdmin && (
            <button
              onClick={handleAdminUpload}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Admin Upload
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PythonHero;