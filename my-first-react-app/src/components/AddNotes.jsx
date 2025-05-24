import React, { useState, useRef } from 'react';

const AddNotes = () => {
  const [formData, setFormData] = useState({
    category: '',
    topic: '',
    fileType: '',
    notes: '',
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const categories = ['Programming Language', 'Front End', 'Server Side', 'Database'];
  const topicsByCategory = {
    'Programming Language': ['C', 'C#', 'C++', 'Java', 'Python'],
    'Front End': ['HTML', 'CSS', 'React', 'Bootstrap', 'Angular', 'JavaScript'],
    'Server Side': ['Java', 'C#', 'Python'],
    Database: ['SQL'],
  };
  const fileTypes = ['PPT', 'Handwritten Notes', 'PDF'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setFormData({ ...formData, category: value, topic: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, topic, fileType, notes } = formData;

    if (!category || !topic || !fileType) {
      alert('Please complete all required fields.');
      return;
    }

    if (!notes.trim() && !file) {
      alert('Please provide notes or upload a file.');
      return;
    }

    // Save to localStorage
    const note = {
      id: Date.now(),
      category,
      topic,
      fileType,
      notes: notes.trim() || null,
      fileName: file ? file.name : null,
    };

    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    localStorage.setItem('notes', JSON.stringify([...existingNotes, note]));

    console.log('Note Saved:', note);

    setFormData({
      category: '',
      topic: '',
      fileType: '',
      notes: '',
    });
    setFile(null);
    fileInputRef.current.value = '';
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Add Your Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
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
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!formData.category}
            >
              <option value="">Select Topic</option>
              {formData.category &&
                topicsByCategory[formData.category].map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">File Type</label>
            <select
              name="fileType"
              value={formData.fileType}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select File Type</option>
              {fileTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Upload a File (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg">
              <p className="text-gray-600">
                Drag and drop your {formData.fileType || 'file'} here
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={
                  formData.fileType === 'PPT'
                    ? '.ppt,.pptx'
                    : formData.fileType === 'Handwritten Notes'
                    ? '.pdf,.jpg,.jpeg,.png'
                    : '.pdf'
                }
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleChooseFile}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Choose File
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <label className="block text-sm font-medium mb-2">Your Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full p-4 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your notes here..."
          ></textarea>
        </div>
        <div className="mt-6 text-right">
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

export default AddNotes;