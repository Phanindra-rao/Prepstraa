import React from 'react';

const NotesHero = ({ setActiveTab }) => {
  const handleCNotes = () => {
    setActiveTab('C');
  };

  const handleCSharpNotes = () => {
    setActiveTab('C#');
  };

  const handlePythonNotes = () => {
    setActiveTab('Python');
  };

  const handleAllNotes = () => {
    setActiveTab('C'); // Reset to default tab
  };

  return (
    <section className="bg-teal-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Browse All Notes by Language
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleCNotes}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            C Notes
          </button>
          <button
            onClick={handleCSharpNotes}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            C# Notes
          </button>
          <button
            onClick={handlePythonNotes}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Python Notes
          </button>
          <button
            onClick={handleAllNotes}
            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Browse All Notes
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotesHero;