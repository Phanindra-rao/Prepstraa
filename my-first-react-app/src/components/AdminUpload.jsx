import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState('');
  const [fileCategory, setFileCategory] = useState('');
  const [questions, setQuestions] = useState([{ id: uuidv4(), question: '', answer: '', category: '' }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile({ name: selectedFile.name, data: reader.result, type: selectedFile.type });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleFileInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fileTitle') setFileTitle(value);
    if (name === 'fileCategory') setFileCategory(value);
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), question: '', answer: '', category: '' }]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if at least one field is filled
    const hasFile = !!file;
    const hasFileTitle = fileTitle.trim() !== '';
    const hasFileCategory = fileCategory.trim() !== '';
    const hasQuestions = questions.some((q) => q.question.trim() || q.answer.trim() || q.category.trim());

    if (!hasFile && !hasFileTitle && !hasFileCategory && !hasQuestions) {
      setError('Please provide at least one field (file, title, category, or question/answer).');
      return;
    }

    const upload = {
      id: uuidv4(),
      file: file ? { name: file.name, data: file.data, type: file.type } : null,
      fileTitle: fileTitle.trim(),
      fileCategory: fileCategory.trim(),
      questions: questions.filter((q) => q.question.trim() || q.answer.trim() || q.category.trim()), // Save non-empty Q&A
      timestamp: new Date().toISOString(),
    };
    const existingUploads = JSON.parse(localStorage.getItem('adminUploads') || '[]');
    localStorage.setItem('adminUploads', JSON.stringify([...existingUploads, upload]));
    alert('Content uploaded successfully!');
    setFile(null);
    setFileTitle('');
    setFileCategory('');
    setQuestions([{ id: uuidv4(), question: '', answer: '', category: '' }]);
    setError('');
    navigate('/admin-upload');
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Upload</h2>
        <Link
          to="/admin-manage"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Manage Uploads
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* File Upload Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Upload File (Optional)</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">File Title</label>
            <input
              type="text"
              name="fileTitle"
              value={fileTitle}
              onChange={handleFileInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., System Design Notes"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">File Category</label>
            <input
              type="text"
              name="fileCategory"
              value={fileCategory}
              onChange={handleFileInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Notes, Study Guide"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select File</label>
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Interview Questions Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Add Interview Questions (Optional)</h3>
          {questions.map((q) => (
            <div key={q.id} className="mb-6 border p-4 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Question</label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(q.id, 'question', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Explain the CAP theorem"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Answer</label>
                <textarea
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(q.id, 'answer', e.target.value)}
                  className="w-full p-2 border rounded-lg h-24"
                  placeholder="e.g., The CAP theorem states..."
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={q.category}
                  onChange={(e) => handleQuestionChange(q.id, 'category', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Technical, Behavioral"
                />
              </div>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(q.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Question
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Another Question
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminUpload;