import React, { useState, useEffect } from 'react';

const Solutions = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [questionForm, setQuestionForm] = useState({
    category: '',
    topic: '',
    question: '',
  });
  const [searchForm, setSearchForm] = useState({
    category: '',
    topic: '',
    keyword: '',
  });
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const categories = ['Programming Language', 'Front End', 'Server Side', 'Database'];
  const topicsByCategory = {
    'Programming Language': ['C', 'C#', 'C++', 'Java', 'Python'],
    'Front End': ['HTML', 'CSS', 'React', 'Bootstrap', 'Angular', 'JavaScript'],
    'Server Side': ['Java', 'C#', 'Python'],
    Database: ['SQL'],
  };

  // Mock Q&A data
  const qaData = [
    {
      id: 1,
      category: 'Front End',
      topic: 'React',
      question: 'How do you manage state in React?',
      answer: 'Use useState for local state, useReducer for complex state, or Redux for global state.',
    },
    {
      id: 2,
      category: 'Database',
      topic: 'SQL',
      question: 'What is a JOIN in SQL?',
      answer: 'A JOIN combines rows from two or more tables based on a related column.',
    },
    {
      id: 3,
      category: 'Programming Language',
      topic: 'Python',
      question: 'How do you handle exceptions in Python?',
      answer: 'Use try-except blocks to catch and handle exceptions.',
    },
    {
      id: 4,
      category: 'Server Side',
      topic: 'Java',
      question: 'What is Spring Boot?',
      answer: 'Spring Boot is a framework for building Java-based web applications with minimal configuration.',
    },
  ];

  const handleQuestionInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setQuestionForm({ ...questionForm, category: value, topic: '' });
    } else {
      setQuestionForm({ ...questionForm, [name]: value });
    }
  };

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setSearchForm({ ...searchForm, category: value, topic: '' });
    } else {
      setSearchForm({ ...searchForm, [name]: value });
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const { category, topic, question } = questionForm;

    if (!category || !topic || !question.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    console.log('Question Submitted:', { category, topic, question });

    setQuestionForm({ category: '', topic: '', question: '' });
  };

  useEffect(() => {
    const searchQuestions = () => {
      const { category, topic, keyword } = searchForm;
      const filtered = qaData.filter((qa) => {
        const categoryMatch = category ? qa.category === category : true;
        const topicMatch = topic ? qa.topic === topic : true;
        const keywordMatch = keyword
          ? qa.question.toLowerCase().includes(keyword.toLowerCase()) ||
            qa.answer.toLowerCase().includes(keyword.toLowerCase())
          : true;
        return categoryMatch && topicMatch && keywordMatch;
      });
      setFilteredQuestions(filtered);
    };
    searchQuestions();
  }, [searchForm]);

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Q&A Solutions</h2>
        {activeTab === 'search' && (
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              name="keyword"
              value={searchForm.keyword}
              onChange={handleSearchInputChange}
              placeholder="Search by keyword..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('post')}
          className={`flex-1 py-3 text-lg font-semibold rounded-lg ${
            activeTab === 'post'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-700 hover:text-white`}
        >
          Post a Question
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-3 text-lg font-semibold rounded-lg ${
            activeTab === 'search'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-700 hover:text-white`}
        >
          Search for a Solution
        </button>
      </div>

      {/* Post a Question */}
      {activeTab === 'post' && (
        <form onSubmit={handleQuestionSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={questionForm.category}
                onChange={handleQuestionInputChange}
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
                value={questionForm.topic}
                onChange={handleQuestionInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!questionForm.category}
              >
                <option value="">Select Topic</option>
                {questionForm.category &&
                  topicsByCategory[questionForm.category].map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Your Question</label>
            <textarea
              name="question"
              value={questionForm.question}
              onChange={handleQuestionInputChange}
              className="w-full p-4 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your question here..."
            ></textarea>
          </div>
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Submit Question
            </button>
          </div>
        </form>
      )}

      {/* Search for a Solution */}
      {activeTab === 'search' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={searchForm.category}
                onChange={handleSearchInputChange}
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
                value={searchForm.topic}
                onChange={handleSearchInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!searchForm.category}
              >
                <option value="">Select Topic</option>
                {searchForm.category &&
                  topicsByCategory[searchForm.category].map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((qa) => (
                <div
                  key={qa.id}
                  className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold">{qa.question}</h3>
                  <p className="text-gray-600 mt-2">{qa.answer}</p>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {qa.category}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2">
                      {qa.topic}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No questions match your filters.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Solutions;