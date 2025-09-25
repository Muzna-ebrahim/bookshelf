import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg text-gray-600 mb-4">
          A simple bookshelf app to manage your reading collection.
        </p>
        
        <p className="text-gray-600">
          Keep track of books you want to read, are currently reading, or have finished. 
          Organize by categories and leave reviews.
        </p>
      </div>
    </div>
  );
};

export default About;