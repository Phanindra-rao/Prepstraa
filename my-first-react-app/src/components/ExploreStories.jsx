import React, { useState } from 'react';
import StoryCard from './StoryCard';

const ExploreStories = () => {
  const [filters, setFilters] = useState({
    stream: '',
    customStream: '',
    field: '',
    customField: '',
    level: '',
    customLevel: '',
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

  // Mock story data
  const stories = [
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineer',
      stream: 'Software',
      field: 'Developer',
      level: 'Mid Level',
      preview: 'The interview had 2 coding rounds and a system design round...',
      tags: ['Coding', 'System Design'],
    },
    {
      id: 2,
      company: 'Infosys',
      role: 'Data Analyst',
      stream: 'SQL',
      field: 'Data Analyst',
      level: 'Entry Level',
      preview: 'Mostly SQL queries and data modeling questions...',
      tags: ['SQL', 'Data Analysis'],
    },
    {
      id: 3,
      company: 'MedTech',
      role: 'Clinical Researcher',
      stream: 'Health Care',
      field: 'Clinical',
      level: 'Senior Level',
      preview: 'Focused on clinical trial protocols...',
      tags: ['Clinical Research'],
    },
    {
      id: 4,
      company: 'HR Solutions',
      role: 'Recruiter',
      stream: 'HR',
      field: 'Recruitment',
      level: 'Mid Level',
      preview: 'Behavioral questions and recruitment strategies...',
      tags: ['HR', 'Recruitment'],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stream') {
      setFilters({ ...filters, stream: value, field: '', customField: '' });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const applyFilters = () => {
    const { stream, customStream, field, customField, level, customLevel } = filters;
    const finalStream = stream === 'Custom' ? customStream : stream;
    const finalField =
      stream && ['Software', 'Health Care', 'HR', 'SQL'].includes(stream)
        ? field === 'Custom'
          ? customField
          : field
        : null;
    const finalLevel = level === 'Custom' ? customLevel : level;

    if (!finalStream && !finalField && !finalLevel) {
      return stories; // Show all stories if no filters applied
    }

    return stories.filter((story) => {
      const streamMatch = finalStream ? story.stream === finalStream : true;
      const fieldMatch = finalField ? story.field === finalField : true;
      const levelMatch = finalLevel ? story.level === finalLevel : true;
      return streamMatch && fieldMatch && levelMatch;
    });
  };

  const filteredStories = applyFilters();

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Explore Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stream */}
        <div>
          <label className="block text-sm font-medium mb-2">Stream</label>
          <select
            name="stream"
            value={filters.stream}
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
          {filters.stream === 'Custom' && (
            <input
              type="text"
              name="customStream"
              value={filters.customStream}
              onChange={handleInputChange}
              placeholder="Enter custom stream"
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Field */}
        {['Software', 'Health Care', 'HR', 'SQL'].includes(filters.stream) && (
          <div>
            <label className="block text-sm font-medium mb-2">Field</label>
            <select
              name="field"
              value={filters.field}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Field</option>
              {(filters.stream === 'Software'
                ? softwareFields
                : filters.stream === 'Health Care'
                ? healthCareFields
                : filters.stream === 'HR'
                ? hrFields
                : sqlFields
              ).map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
            {filters.field === 'Custom' && (
              <input
                type="text"
                name="customField"
                value={filters.customField}
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
            value={filters.level}
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
          {filters.level === 'Custom' && (
            <input
              type="text"
              name="customLevel"
              value={filters.customLevel}
              onChange={handleInputChange}
              placeholder="Enter custom level"
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      </div>

      {/* Filtered Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              company={story.company}
              role={story.role}
              preview={story.preview}
              tags={story.tags}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No stories match your filters.</p>
        )}
      </div>
    </section>
  );
};

export default ExploreStories;