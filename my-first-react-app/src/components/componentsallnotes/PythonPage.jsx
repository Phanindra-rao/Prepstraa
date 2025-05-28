import React from 'react';
import PythonHero from '../PythonHero';
import Footer from '../Footer';

const PythonPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PythonHero />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Python Programming Resources</h2>
        <p>Explore resources, notes, and interview tips for Python programming.</p>
      </main>
      <Footer />
    </div>
  );
};

export default PythonPage;