import React from 'react';
import StoryCard from './StoryCard.jsx';

const LatestStories = () => (
    <section id="latest-stories" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Latest Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StoryCard
                company="Google"
                role="SDE II"
                preview="The interview had 2 coding rounds and a system design round. Focused heavily on..."
                tags={["Coding", "System Design"]}
            />
            <StoryCard
                company="Infosys"
                role="Data Analyst"
                preview="Mostly HR questions, but they asked about SQL queries and..."
                tags={["HR Questions"]}
            />
        </div>
    </section>
);

export default LatestStories;