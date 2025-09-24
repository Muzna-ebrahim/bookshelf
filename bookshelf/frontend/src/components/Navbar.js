import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Bookshelf</h1>
      </div>
      <nav className="nav-menu">
        <Link 
          to="/" 
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/books" 
          className={`nav-item ${isActive('/books') ? 'active' : ''}`}
        >
          Books
        </Link>
        <Link 
          to="/about" 
          className={`nav-item ${isActive('/about') ? 'active' : ''}`}
        >
          About
        </Link>
        <button 
          onClick={onLogout}
          className="nav-item"
        >
          Logout
        </button>
      </nav>
      <div className="user-info">
        <span>Welcome, {user.username}!</span>
      </div>
    </div>
  );
};

export default Navbar;