import React from 'react';
import CSharpHero from '../CSharpHero';
import Footer from '../Footer';

const CSharpPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CSharpHero />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">C# Programming Resources</h2>
        <p>Explore resources, notes, and interview tips for C# programming.</p>
      </main>
      <Footer />
    </div>
  );
};

export default CSharpPage;