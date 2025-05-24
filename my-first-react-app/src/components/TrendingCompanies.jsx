import React from 'react';

const TrendingCompanies = () => (
    <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Trending Companies</h2>
        <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-4 text-left">Company</th>
                        <th className="p-4 text-left">Shared Experiences</th>
                        <th className="p-4 text-left">Avg. Difficulty</th>
                        <th className="p-4 text-left">Popular Topics</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t">
                        <td className="p-4">Google</td>
                        <td className="p-4">1,245</td>
                        <td className="p-4">★★★★☆</td>
                        <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">System Design</span>
                            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">Coding</span>
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="p-4">Infosys</td>
                        <td className="p-4">897</td>
                        <td className="p-4">★★★☆☆</td>
                        <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">HR Questions</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
);

export default TrendingCompanies;