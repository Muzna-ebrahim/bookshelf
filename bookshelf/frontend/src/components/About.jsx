import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Bookshelf</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <p className="text-lg text-gray-600">
          <strong>Bookshelf</strong> is your personal digital library management system.
        </p>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Organize books by categories</li>
            <li>Track reading progress</li>
            <li>Admin book management</li>
            <li>Beautiful category-based themes</li>
            <li>User authentication system</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Categories:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="text-purple-600 font-medium">Philosophy</span> - Purple theme</li>
            <li><span className="text-green-600 font-medium">Programming</span> - Green theme</li>
            <li><span className="text-blue-600 font-medium">Science Fiction</span> - Blue theme</li>
            <li><span className="text-yellow-600 font-medium">History</span> - Yellow theme</li>
          </ul>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Built with React & Flask • Version 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;