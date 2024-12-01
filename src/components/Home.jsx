import React from 'react';
import Hero from './Hero';

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <div className="py-12">
        <h2 className="text-3xl font-bold mb-6">Welcome to My Personal Website</h2>
        <p className="text-lg text-gray-300 mb-4">
          This is a space where I share my thoughts, projects, and experiences.
        </p>
      </div>
    </div>
  );
};

export default Home;
