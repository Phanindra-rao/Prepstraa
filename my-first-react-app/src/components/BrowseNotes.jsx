import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Footer from './Footer';

const BrowseNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Mock interview notes from localStorage
    const mockNotes = [
      // C Notes
      { id: 'in1', category: 'C', topic: 'Pointers', question: 'What is a pointer?', answer: 'A pointer is a variable that stores a memory address.', type: 'Interview' },
      { id: 'in2', category: 'C', topic: 'Arrays', question: 'How do arrays work in C?', answer: 'Arrays are contiguous memory locations accessed by index.', type: 'Interview' },
      // C# Notes
      { id: 'in3', category: 'C#', topic: 'Classes', question: 'What is a class in C#?', answer: 'A class is a blueprint for objects.', type: 'Interview' },
      { id: 'in4', category: 'C#', topic: 'Interfaces', question: 'What is an interface?', answer: 'An interface defines a contract for classes.', type: 'Interview' },
      // Python Notes
      { id: 'in5', category: 'Python', topic: 'List Comprehensions', question: 'What is a list comprehension?', answer: 'A concise way to create lists.', type: 'Interview' },
      { id: 'in6', category: 'Python', topic: 'Dictionaries', question: 'How do dictionaries work?', answer: 'Dictionaries store key-value pairs.', type: 'Interview' },
      // React Notes
      { id: 'in7', category: 'React', topic: 'Components', question: 'What is a React component?', answer: 'A component is a reusable piece of UI.', type: 'Interview' },
      { id: 'in8', category: 'React', topic: 'Hooks', question: 'What are React Hooks?', answer: 'Hooks are functions that let you use state and lifecycle features in functional components.', type: 'Interview' },
      // Angular Notes
      { id: 'in9', category: 'Angular', topic: 'Directives', question: 'What is an Angular directive?', answer: 'Directives extend HTML with custom behavior.', type: 'Interview' },
      { id: 'in10', category: 'Angular', topic: 'Services', question: 'What is a service in Angular?', answer: 'Services handle business logic and data sharing.', type: 'Interview' },
      // Java Notes
      { id: 'in11', category: 'Java', topic: 'OOP', question: 'What are the principles of OOP in Java?', answer: 'Encapsulation, Inheritance, Polymorphism, Abstraction.', type: 'Interview' },
      { id: 'in12', category: 'Java', topic: 'Collections', question: 'What is the Java Collections Framework?', answer: 'A set of classes and interfaces for storing and manipulating data.', type: 'Interview' },
      // C++ Notes
      { id: 'in13', category: 'C++', topic: 'STL', question: 'What is the C++ STL?', answer: 'Standard Template Library provides containers, algorithms, and iterators.', type: 'Interview' },
      { id: 'in14', category: 'C++', topic: 'Templates', question: 'What are templates in C++?', answer: 'Templates enable generic programming for functions and classes.', type: 'Interview' },
      // SAP Notes
      { id: 'in15', category: 'SAP', topic: 'ABAP', question: 'What is ABAP in SAP?', answer: 'Advanced Business Application Programming is SAP’s programming language.', type: 'Interview' },
      { id: 'in16', category: 'SAP', topic: 'Fiori', question: 'What is SAP Fiori?', answer: 'A user experience design for SAP applications.', type: 'Interview' }
    ];
    localStorage.setItem('interviewNotes', JSON.stringify(mockNotes));
    setNotes(JSON.parse(localStorage.getItem('interviewNotes') || '[]'));

    // Extract unique categories
    const uniqueCategories = [...new Set(mockNotes.map(note => note.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    // Update topics based on selected category
    if (selectedCategory) {
      const filteredTopics = [...new Set(
        notes.filter(note => note.category === selectedCategory)
             .map(note => note.topic)
      )];
      setTopics(filteredTopics);
      setSelectedTopic(''); // Reset topic when category changes
    } else {
      setTopics([]);
      setSelectedTopic('');
    }
  }, [selectedCategory, notes]);

  const filteredNotes = notes.filter(note => 
    (!selectedCategory || note.category === selectedCategory) &&
    (!selectedTopic || note.topic === selectedTopic)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Browse Interview Notes</h2>
        <p className="mb-6">Select a category and topic to view relevant interview notes.</p>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600"
              disabled={!selectedCategory}
            >
              <option value="">All Topics</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <div key={note.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">{note.topic}</h3>
                <p className="text-gray-600 mb-2"><strong>Question:</strong> {note.question}</p>
                <p className="text-gray-600"><strong>Answer:</strong> {note.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No notes available for the selected filters.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrowseNotes;