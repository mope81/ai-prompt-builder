import React from 'react';

const Learn = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your learning resources content here */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-300">
            Begin your learning journey with our comprehensive guides and tutorials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Learn;
