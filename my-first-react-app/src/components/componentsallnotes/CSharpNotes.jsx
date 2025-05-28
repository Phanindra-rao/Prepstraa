import React, { useState } from 'react';

const CSharpNotes = ({ notes }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = ['Intro', 'Operators', 'If-Else', 'Loops'];
  const groupedNotes = sections.map(section => ({
    section,
    notes: notes.filter(note => note.section === section)
  }));

  return (
    <div className="space-y-4">
      {groupedNotes.map(({ section, notes }) => (
        <div key={section} className="bg-white rounded-lg shadow-md">
          <button
            onClick={() => toggleSection(section)}
            className="w-full px-6 py-4 text-left text-xl font-semibold text-blue-600 flex justify-between items-center hover:bg-gray-50"
          >
            {section}
            <span className="text-2xl">{openSection === section ? '−' : '+'}</span>
          </button>
          {openSection === section && (
            <div className="px-6 py-4 space-y-4">
              {notes.length > 0 ? (
                notes.map(note => (
                  <div key={note.id} className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-base font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">Notes</h4>
                        <p className="text-gray-600">{note.notes}</p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">Code</h4>
                        <pre className="bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto">{note.code}</pre>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">Example</h4>
                        <pre className="bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto">{note.example}</pre>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">Practice Question</h4>
                        <p className="text-gray-600">{note.practiceQuestion}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No notes available for {section}.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CSharpNotes;