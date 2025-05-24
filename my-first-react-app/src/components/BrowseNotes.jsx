import React, { useState, useEffect } from 'react';

const BrowseNotes = () => {
  const [filters, setFilters] = useState({
    category: '',
    topic: '',
  });
  const [notes, setNotes] = useState([]);

  const categories = ['Programming Language', 'Front End', 'Server Side', 'Database'];
  const topicsByCategory = {
    'Programming Language': ['C', 'C#', 'C++', 'Java', 'Python'],
    'Front End': ['HTML', 'CSS', 'React', 'Bootstrap', 'Angular', 'JavaScript'],
    'Server Side': ['Java', 'C#', 'Python'],
    Database: ['SQL'],
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setFilters({ ...filters, category: value, topic: '' });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const filteredNotes = notes.filter((note) => {
    const categoryMatch = filters.category ? note.category === filters.category : true;
    const topicMatch = filters.topic ? note.topic === filters.topic : true;
    return categoryMatch && topicMatch;
  });

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Browse Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Topic</label>
          <select
            name="topic"
            value={filters.topic}
            onChange={handleFilterChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!filters.category}
          >
            <option value="">Select Topic</option>
            {filters.category &&
              topicsByCategory[filters.category].map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{note.topic || 'Untitled'} Notes</h3>
                {note.isAdmin && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                    Admin
                  </span>
                )}
              </div>
              {note.category && (
                <p className="text-gray-600 mt-2">
                  <strong>Category:</strong> {note.category}
                </p>
              )}
              {note.fileType && (
                <p className="text-gray-600">
                  <strong>File Type:</strong> {note.fileType}
                </p>
              )}
              {note.notes && (
                <p className="text-gray-600 mt-2">
                  <strong>Notes:</strong> {note.notes}
                </p>
              )}
              {note.fileName && (
                <p className="text-gray-600 mt-2">
                  <strong>File:</strong> {note.fileName} (Download not available in demo)
                </p>
              )}
              {note.questions && note.questions.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600 font-semibold">Interview Questions:</p>
                  {note.questions.map((qa, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-gray-600">
                        <strong>Q{index + 1}:</strong> {qa.question}
                      </p>
                      <p className="text-gray-600">
                        <strong>A:</strong> {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No notes found for the selected filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default BrowseNotes;