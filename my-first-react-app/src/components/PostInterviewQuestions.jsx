import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer';

const PostInterviewQuestions = () => {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [role, setRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [customExperienceLevel, setCustomExperienceLevel] = useState('');
  const [company, setCompany] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [interviewType, setInterviewType] = useState('');
  const [customInterviewType, setCustomInterviewType] = useState('');
  const [experience, setExperience] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const [error, setError] = useState('');

  // Role options based on category
  const roleOptions = {
    Software: ['Developer', 'Testing', 'Frontend', 'SQL', 'DevOps'],
    Healthcare: ['Nurse', 'Doctor', 'Pharmacist', 'Administrator', 'Technician'],
    HR: ['Recruiter', 'HR Manager', 'Trainer', 'Payroll Specialist', 'Employee Relations'],
    Finance: ['Analyst', 'Accountant', 'Advisor', 'Auditor', 'Risk Manager'],
    Education: ['Teacher', 'Administrator', 'Counselor', 'Librarian', 'Instructional Designer']
  };

  // Predefined companies
  const companyOptions = ['Google', 'Microsoft', 'Amazon', 'Tesla', 'IBM'];

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('postInterviewNotes') || '[]');
    setNotes(storedNotes);
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = category === 'Custom' ? customCategory.trim() : category;
    const finalRole = role === 'Custom' ? customRole.trim() : role;
    const finalExperienceLevel = experienceLevel === 'Custom' ? customExperienceLevel.trim() : experienceLevel;
    const finalCompany = company === 'Custom' ? customCompany.trim() : company;
    const finalInterviewType = interviewType === 'Custom' ? customInterviewType.trim() : interviewType;

    if (!finalCategory || !finalRole || !finalExperienceLevel || !finalCompany || !finalInterviewType || !experience.trim()) {
      setError('All fields are required.');
      return;
    }
    for (const q of questions) {
      if (!q.question.trim() || !q.answer.trim()) {
        setError('All questions and answers are required.');
        return;
      }
    }

    const newNote = {
      id: uuidv4(),
      category: finalCategory,
      role: finalRole,
      experienceLevel: finalExperienceLevel,
      company: finalCompany,
      interviewType: finalInterviewType,
      experience: experience.trim(),
      questions,
      type: 'UserInterview'
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('postInterviewNotes', JSON.stringify(updatedNotes));

    // Reset form
    setCategory('');
    setCustomCategory('');
    setRole('');
    setCustomRole('');
    setExperienceLevel('');
    setCustomExperienceLevel('');
    setCompany('');
    setCustomCompany('');
    setInterviewType('');
    setCustomInterviewType('');
    setExperience('');
    setQuestions([{ question: '', answer: '' }]);
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Post Interview Questions</h2>
        <p className="mb-6">Share your interview experience and questions below.</p>
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          {error && <p className="text-red-600 mb-4">{error}</p>}
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setRole(''); // Reset role when category changes
                setCustomCategory('');
              }}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">Select Category</option>
              {['Software', 'Healthcare', 'HR', 'Finance', 'Education', 'Custom'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {category === 'Custom' && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter custom category"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setCustomRole('');
              }}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
              disabled={!category || category === 'Custom'}
            >
              <option value="">Select Role</option>
              {(category && category !== 'Custom' ? roleOptions[category] : []).concat(['Custom']).map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {(role === 'Custom' || category === 'Custom') && (
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter custom role"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => {
                setExperienceLevel(e.target.value);
                setCustomExperienceLevel('');
              }}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">Select Experience Level</option>
              {['Entry', 'Mid-Level', 'Senior', 'Custom'].map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {experienceLevel === 'Custom' && (
              <input
                type="text"
                value={customExperienceLevel}
                onChange={(e) => setCustomExperienceLevel(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter custom experience level"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <select
              id="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setCustomCompany('');
              }}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">Select Company</option>
              {companyOptions.concat(['Custom']).map(comp => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
            {company === 'Custom' && (
              <input
                type="text"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter custom company"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="interviewType" className="block text-sm font-medium text-gray-700 mb-1">
              Interview Type
            </label>
            <select
              id="interviewType"
              value={interviewType}
              onChange={(e) => {
                setInterviewType(e.target.value);
                setCustomInterviewType('');
              }}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">Select Interview Type</option>
              {['Hybrid', 'Onsite', 'Remote', 'Custom'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {interviewType === 'Custom' && (
              <input
                type="text"
                value={customInterviewType}
                onChange={(e) => setCustomInterviewType(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter custom interview type"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Interview Experience
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
              placeholder="Describe your interview experience"
              rows="4"
            />
          </div>

          {questions.map((q, index) => (
            <div key={index} className="mb-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
              <div className="mb-2">
                <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  id={`question-${index}`}
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Enter your interview question"
                />
              </div>
              <div>
                <label htmlFor={`answer-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Answer
                </label>
                <textarea
                  id={`answer-${index}`}
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Enter your answer"
                  rows="4"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 mb-4"
          >
            + Add Another Question
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map(note => (
              <div key={note.id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-2"><strong>Category:</strong> {note.category}</p>
                <p className="text-gray-600 mb-2"><strong>Role:</strong> {note.role}</p>
                <p className="text-gray-600 mb-2"><strong>Experience Level:</strong> {note.experienceLevel}</p>
                <p className="text-gray-600 mb-2"><strong>Company:</strong> {note.company}</p>
                <p className="text-gray-600 mb-2"><strong>Interview Type:</strong> {note.interviewType}</p>
                <p className="text-gray-600 mb-2"><strong>Experience:</strong> {note.experience}</p>
                <div>
                  <strong>Questions & Answers:</strong>
                  <ul className="list-disc pl-5">
                    {note.questions.map((q, idx) => (
                      <li key={idx} className="text-gray-600 mb-2">
                        <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                        <p><strong>A:</strong> {q.answer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No interview notes posted yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostInterviewQuestions;