import React from 'react';

const Hero = () => {
  const handlePostYourOwn = () => {
    window.open('/interview-upload', '_blank');
  };

  const handleAddNotes = () => {
    window.open('/add-notes', '_blank');
  };

  const handleExploreStories = () => {
    window.open('/explore-stories', '_blank');
  };

  const handleSolutions = () => {
    window.open('/solutions', '_blank');
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
          Real Interview Experiences. Real People. Real Insights.
        </h1>
        <div className="space-x-4">
          <button
            onClick={handleExploreStories}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Explore Stories
          </button>
          <button
            onClick={handlePostYourOwn}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Post Your Own
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
            onClick={handleBrowseNotes}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700"
          >
            Browse Notes
          </button>
          <button
            onClick={handleAdminUpload}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Admin Upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;