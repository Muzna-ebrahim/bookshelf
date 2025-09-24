import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-600">📚 Bookshelf</h1>
            <div className="flex space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/books"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/books') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Books
              </Link>
              <Link
                to="/my-books"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/my-books') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                My Books
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/about') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.username}!</span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
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