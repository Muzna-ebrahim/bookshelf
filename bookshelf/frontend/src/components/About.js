import React from 'react';

const About = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">About Bookshelf</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <p>
            Bookshelf is a comprehensive reading management platform designed to help you organize 
            and track your personal library. Whether you're an avid reader or managing a collection, 
            our platform provides the tools you need.
          </p>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Organize books by categories (Philosophy, Programming, Science Fiction, History)</li>
              <li>Track reading progress with status updates</li>
              <li>Admin tools for managing book collections</li>
              <li>User authentication with reader and admin roles</li>
              <li>Responsive design for all devices</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">User Roles:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Readers:</strong> Browse books, track reading status, manage personal collections</li>
              <li><strong>Admins:</strong> Add new books, manage authors, full collection management</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Built with Flask backend and React frontend for a modern, interactive experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;