import React from 'react';

const StoryCard = ({ company, role, preview, tags }) => (
    <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold">{company} - {role}</h3>
        <p className="text-gray-600 mt-2">{preview}</p>
        <div className="mt-4">
            {tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2">{tag}</span>
            ))}
        </div>
        <div className="mt-4 flex space-x-4">
            <button className="text-blue-600 hover:underline">Like</button>
            <button className="text-blue-600 hover:underline">Comment</button>
            <button className="text-blue-600 hover:underline">Read More</button>
        </div>
    </div>
);

export default StoryCard;