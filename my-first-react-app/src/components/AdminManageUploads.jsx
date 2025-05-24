import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminManageUploads = () => {
  const [uploads, setUploads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem('adminUploads') || '[]');
    setUploads(storedUploads);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this upload?')) {
      const updatedUploads = uploads.filter((upload) => upload.id !== id);
      localStorage.setItem('adminUploads', JSON.stringify(updatedUploads));
      setUploads(updatedUploads);
      alert('Upload deleted successfully!');
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Manage Admin Uploads</h2>
      {uploads.length === 0 ? (
        <p className="text-gray-600">No uploads found.</p>
      ) : (
        <div className="space-y-6">
          {uploads.map((upload) => (
            <div key={upload.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  {upload.fileTitle || 'Untitled Upload'} ({new Date(upload.timestamp).toLocaleString()})
                </h3>
                <button
                  onClick={() => handleDelete(upload.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              {upload.file && (
                <p className="text-sm text-gray-600">
                  File: {upload.file.name} ({upload.file.type})
                </p>
              )}
              {upload.fileCategory && (
                <p className="text-sm text-gray-600">Category: {upload.fileCategory}</p>
              )}
              {upload.questions && upload.questions.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Questions:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {upload.questions.map((q) => (
                      <li key={q.id}>
                        {q.question && <span><strong>Q:</strong> {q.question}</span>}
                        {q.answer && <span><br /><strong>A:</strong> {q.answer}</span>}
                        {q.category && <span><br /><strong>Category:</strong> {q.category}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminManageUploads;