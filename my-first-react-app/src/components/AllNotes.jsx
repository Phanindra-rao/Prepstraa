import React, { useState, useEffect } from 'react';
import NotesHero from './NotesHero';
import Footer from './Footer';
import CNotes from './componentsallnotes/CNotes';
import CSharpNotes from './componentsallnotes/CSharpNotes';
import PythonNotes from './componentsallnotes/PythonNotes';

const AllNotes = () => {
  const [activeTab, setActiveTab] = useState('C');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Mock notes from localStorage
    const mockNotes = [
      // C Notes
      {
        id: 'c1',
        language: 'C',
        section: 'Intro',
        title: 'Introduction to C',
        notes: 'C is a general-purpose programming language known for its efficiency and control over system resources.',
        code: '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
        example: '#include <stdio.h>\nint main() {\n    printf("Welcome to C!");\n    return 0;\n}\n// Output: Welcome to C!',
        practiceQuestion: 'Write a C program to print your name.'
      },
      {
        id: 'c2',
        language: 'C',
        section: 'Operators',
        title: 'Arithmetic Operators in C',
        notes: 'C supports operators like +, -, *, /, and % for arithmetic operations.',
        code: 'int a = 10, b = 3;\nint sum = a + b;\nint mod = a % b;',
        example: '#include <stdio.h>\nint main() {\n    int a = 10, b = 3;\n    printf("Sum: %d, Mod: %d", a + b, a % b);\n    return 0;\n}\n// Output: Sum: 13, Mod: 1',
        practiceQuestion: 'Write a program to calculate the remainder of two numbers.'
      },
      {
        id: 'c3',
        language: 'C',
        section: 'If-Else',
        title: 'Conditional Statements in C',
        notes: 'If-else statements control program flow based on conditions.',
        code: 'if (condition) {\n    // code\n} else {\n    // code\n}',
        example: '#include <stdio.h>\nint main() {\n    int x = 5;\n    if (x > 0) {\n        printf("Positive");\n    } else {\n        printf("Non-positive");\n    }\n    return 0;\n}\n// Output: Positive',
        practiceQuestion: 'Write a program to check if a number is even or odd.'
      },
      {
        id: 'c4',
        language: 'C',
        section: 'Loops',
        title: 'For Loop in C',
        notes: 'For loops repeat a block of code a specified number of times.',
        code: 'for (int i = 0; i < n; i++) {\n    // code\n}',
        example: '#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    return 0;\n}\n// Output: 1 2 3 4 5',
        practiceQuestion: 'Write a program to print the first 10 natural numbers.'
      },
      // C# Notes
      {
        id: 'cs1',
        language: 'C#',
        section: 'Intro',
        title: 'Introduction to C#',
        notes: 'C# is a modern, object-oriented language developed by Microsoft for .NET applications.',
        code: 'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
        example: 'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Welcome to C#!");\n    }\n}\n// Output: Welcome to C#!',
        practiceQuestion: 'Write a C# program to display your favorite quote.'
      },
      {
        id: 'cs2',
        language: 'C#',
        section: 'Operators',
        title: 'Arithmetic Operators in C#',
        notes: 'C# supports arithmetic operators like +, -, *, /, and %.',
        code: 'int a = 10, b = 3;\nint sum = a + b;\nint mod = a % b;',
        example: 'using System;\nclass Program {\n    static void Main() {\n        int a = 10, b = 3;\n        Console.WriteLine($"Sum: {a + b}, Mod: {a % b}");\n    }\n}\n// Output: Sum: 13, Mod: 1',
        practiceQuestion: 'Write a program to compute the quotient and remainder of two numbers.'
      },
      {
        id: 'cs3',
        language: 'C#',
        section: 'If-Else',
        title: 'Conditional Statements in C#',
        banks: 'If-else statements in C# control program flow.',
        code: 'if (condition) {\n    // code\n} else {\n    // code\n}',
        example: 'using System;\nclass Program {\n    static void Main() {\n        int x = 5;\n        if (x > 0) {\n            Console.WriteLine("Positive");\n        } else {\n            Console.WriteLine("Non-positive");\n        }\n    }\n}\n// Output: Positive',
        practiceQuestion: 'Write a program to check if a number is divisible by 3.'
      },
      {
        id: 'cs4',
        language: 'C#',
        section: 'Loops',
        title: 'For Loop in C#',
        notes: 'For loops in C# iterate over a range.',
        code: 'for (int i = 0; i < n; i++) {\n    // code\n}',
        example: 'using System;\nclass Program {\n    static void Main() {\n        for (int i = 1; i <= 5; i++) {\n            Console.WriteLine(i);\n        }\n    }\n}\n// Output: 1\n2\n3\n4\n5',
        practiceQuestion: 'Write a program to print the squares of numbers from 1 to 5.'
      },
      // Python Notes
      {
        id: 'py1',
        language: 'Python',
        section: 'Intro',
        title: 'Introduction to Python',
        notes: 'Python is a high-level, interpreted language known for its simplicity and readability.',
        code: 'print("Hello, World!")',
        example: 'print("Welcome to Python!")\n# Output: Welcome to Python!',
        practiceQuestion: 'Write a Python script to print your city name.'
      },
      {
        id: 'py2',
        language: 'Python',
        section: 'Operators',
        title: 'Arithmetic Operators in Python',
        notes: 'Python supports operators like +, -, *, /, %, **, and //.',
        code: 'a = 10\nb = 3\nsum = a + b\nmod = a % b',
        example: 'a = 10\nb = 3\nprint(f"Sum: {a + b}, Mod: {a % b}")\n# Output: Sum: 13, Mod: 1',
        practiceQuestion: 'Write a program to calculate the area of a circle given its radius.'
      },
      {
        id: 'py3',
        language: 'Python',
        section: 'If-Else',
        title: 'Conditional Statements in Python',
        notes: 'If-elif statements control flow in Python.',
        code: 'if condition:\n    # code\nelse:\n    # code',
        example: 'x = 5\nif x > 0:\n    print("Positive")\nelse:\n    print("Non-positive")\n# Output: Positive',
        practiceQuestion: 'Write a program to check if a number is greater than 100.'
      },
      {
        id: 'py4',
        language: 'Python',
        section: 'Loops',
        title: 'For Loop in Python',
        notes: 'For loops iterate over sequences.',
        code: 'for i in range(n):\n    # code',
        example: 'for i in range(1, 6):\n    print(i)\n# Output: 1\n2\n3\n4\n5',
        practiceQuestion: 'Write a program to print the cubes of numbers from 1 to 10.'
      }
    ];
    localStorage.setItem('allNotes', JSON.stringify(mockNotes));
    setNotes(JSON.parse(localStorage.getItem('allNotes') || '[]'));
  }, []);

  const renderNotes = () => {
    switch (activeTab) {
      case 'C':
        return <CNotes notes={notes.filter(note => note.language === 'C')} />;
      case 'C#':
        return <CSharpNotes notes={notes.filter(note => note.language === 'C#')} />;
      case 'Python':
        return <PythonNotes notes={notes.filter(note => note.language === 'Python')} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NotesHero setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">All Programming Notes</h2>
        <p className="mb-6">Explore all notes for C, C#, and Python.</p>
        <div className="mb-6">
          <nav className="flex space-x-4 border-b">
            {['C', 'C#', 'Python'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        {renderNotes()}
      </main>
      <Footer />
    </div>
  );
};

export default AllNotes;