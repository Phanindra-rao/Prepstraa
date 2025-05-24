import React, { useState, useRef } from 'react';

const UploadNotes = () => {
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes && !file) {
      alert('Please provide notes or upload a file.');
      return;
    }

    // Log data for testing (replace with backend API call if needed)
    console.log('Notes:', notes);
    console.log('File:', file);

    // Reset form
    setNotes('');
    setFile(null);
    fileInputRef.current.value = '';
  };

  return (
    <section id="upload-notes" className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Upload Your Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Upload a File</label>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg">
              <p className="text-gray-600">Drag and drop your PDF or Word doc here</p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
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
          <div>
            <label className="block text-sm font-medium mb-2">Write Your Notes</label>
            <textarea
              className="w-full p-4 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your interview notes here..."
              value={notes}
              onChange={handleNotesChange}
            ></textarea>
          </div>
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

export default UploadNotes;