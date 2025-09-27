import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth.jsx';
import Dashboard from './components/Dashboard.jsx';
import Books from './components/Books.jsx';
import MyBooks from './components/MyBooks.jsx';
import About from './components/About.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl text-center shadow-2xl">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading your library...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={currentUser} onLogout={handleLogout} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard user={currentUser} onCategorySelect={setSelectedCategory} />} />
            <Route path="/books" element={<Books user={currentUser} selectedCategory={selectedCategory} />} />
            <Route path="/my-books" element={<MyBooks user={currentUser} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;