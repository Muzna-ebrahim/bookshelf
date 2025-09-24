import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout, onShowAbout }) => {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
            Bookshelf
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/books"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              All Books
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Categories
            </Link>

            <button
              onClick={onLogout}
              className="text-gray-700 hover:text-red-600 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;