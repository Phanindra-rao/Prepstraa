import React, { useState } from 'react';

const InterviewUpload = () => {
  const [formData, setFormData] = useState({
    stream: '',
    customStream: '',
    field: '',
    customField: '',
    level: '',
    customLevel: '',
    company: '',
    customCompany: '',
    interviewDetails: '',
    questions: [{ question: '', answer: '' }],
  });

  const streams = ['Software', 'Health Care', 'HR', 'SQL', 'Custom'];
  const healthCareFields = ['Clinical', 'Administrative and Support', 'Support and Technical Staff', 'Custom'];
  const hrFields = ['Recruitment', 'Employee Relations', 'Training and Development', 'Custom'];
  const sqlFields = ['Database Administrator', 'Data Analyst', 'Business Intelligence', 'Custom'];
  const softwareFields = [
    'Developer',
    'Software Engineer',
    'Automation Testing',
    'SQL',
    'DevOps',
    'Front End',
    'Custom',
  ];
  const levels = ['Entry Level', 'Mid Level', 'Senior Level', 'Custom'];
  const companies = [
    'Google',
    'Microsoft',
    'Amazon',
    'Apple',
    'Meta',
    'IBM',
    'Intel',
    'Oracle',
    'Cisco',
    'Custom',
  ];

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'stream') {
      setFormData({ ...formData, stream: value, field: '', customField: '' });
    } else if (name === 'company') {
      setFormData({ ...formData, company: value, customCompany: '' });
    } else if (name === 'question' || name === 'answer') {
      const updatedQuestions = [...formData.questions];
      updatedQuestions[index][name] = value;
      setFormData({ ...formData, questions: updatedQuestions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: '', answer: '' }],
    });
  };

  const removeQuestion = (index) => {
    if (formData.questions.length === 1) return;
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      stream,
      customStream,
      field,
      customField,
      level,
      customLevel,
      company,
      customCompany,
      interviewDetails,
      questions,
    } = formData;

    if (
      !stream ||
      (['Software', 'Health Care', 'HR', 'SQL'].includes(stream) && !field) ||
      !level ||
      !company ||
      !interviewDetails.trim()
    ) {
      alert('Please complete all required fields.');
      return;
    }

    const finalStream = stream === 'Custom' ? customStream : stream;
    const finalField =
      stream && ['Software', 'Health Care', 'HR', 'SQL'].includes(stream)
        ? field === 'Custom'
          ? customField
          : field
        : null;
    const finalLevel = level === 'Custom' ? customLevel : level;
    const finalCompany = company === 'Custom' ? customCompany : company;

    if (!finalStream || (finalField === null && field && !finalField) || !finalLevel || !finalCompany) {
      alert('Please provide valid values for all fields.');
      return;
    }

    // Validate Q&A pairs if any are filled
    const filledQuestions = questions.filter((q) => q.question.trim() || q.answer.trim());
    if (filledQuestions.some((q) => !q.question.trim() || !q.answer.trim())) {
      alert('Please fill out all question and answer fields or remove empty pairs.');
      return;
    }

    const interview = {
      id: Date.now(),
      stream: finalStream,
      field: finalField,
      level: finalLevel,
      company: finalCompany,
      interviewDetails: interviewDetails.trim(),
      questions: filledQuestions.map((q) => ({
        question: q.question.trim(),
        answer: q.answer.trim(),
      })),
    };

    // Save to localStorage
    const existingInterviews = JSON.parse(localStorage.getItem('interviews') || '[]');
    localStorage.setItem('interviews', JSON.stringify([...existingInterviews, interview]));

    console.log('Interview Submitted:', interview);

    setFormData({
      stream: '',
      customStream: '',
      field: '',
      customField: '',
      level: '',
      customLevel: '',
      company: '',
      customCompany: '',
      interviewDetails: '',
      questions: [{ question: '', answer: '' }],
    });
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Share Your Interview Experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stream */}
          <div>
            <label className="block text-sm font-medium mb-2">Stream</label>
            <select
              name="stream"
              value={formData.stream}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Stream</option>
              {streams.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
            {formData.stream === 'Custom' && (
              <input
                type="text"
                name="customStream"
                value={formData.customStream}
                onChange={handleInputChange}
                placeholder="Enter custom stream"
                className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Field */}
          {['Software', 'Health Care', 'HR', 'SQL'].includes(formData.stream) && (
            <div>
              <label className="block text-sm font-medium mb-2">Field</label>
              <select
                name="field"
                value={formData.field}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Field</option>
                {(formData.stream === 'Software'
                  ? softwareFields
                  : formData.stream === 'Health Care'
                  ? healthCareFields
                  : formData.stream === 'HR'
                  ? hrFields
                  : sqlFields
                ).map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              {formData.field === 'Custom' && (
                <input
                  type="text"
                  name="customField"
                  value={formData.customField}
                  onChange={handleInputChange}
                  placeholder="Enter custom field"
                  className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          )}

          {/* Level */}
          <div>
            <label className="block text-sm font-medium mb-2">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {formData.level === 'Custom' && (
              <input
                type="text"
                name="customLevel"
                value={formData.customLevel}
                onChange={handleInputChange}
                placeholder="Enter custom level"
                className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            {formData.company === 'Custom' && (
              <input
                type="text"
                name="customCompany"
                value={formData.customCompany}
                onChange={handleInputChange}
                placeholder="Enter custom company name"
                className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </div>

        {/* Interview Details */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Interview Details</label>
          <textarea
            name="interviewDetails"
            value={formData.interviewDetails}
            onChange={handleInputChange}
            className="w-full p-4 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your interview experience..."
          ></textarea>
        </div>

        {/* Questions and Answers */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Interview Questions (Optional)</h3>
          {formData.questions.map((qa, index) => (
            <div key={index} className="mb-6 border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Question {index + 1}
                </label>
                {formData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              <textarea
                name="question"
                value={qa.question}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-4 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Enter the interview question..."
              ></textarea>
              <label className="block text-sm font-medium mb-2">Answer</label>
              <textarea
                name="answer"
                value={qa.answer}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-4 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer..."
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Another Question
          </button>
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

export default InterviewUpload;