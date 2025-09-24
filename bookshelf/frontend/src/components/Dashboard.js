import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CategoryGrid from './CategoryGrid';
import BookGrid from './BookGrid';
import AddBookModal from './AddBookModal';
import About from './About';

const Dashboard = ({ user, onLogout }) => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  const navigate = useNavigate();
  const [showAddBook, setShowAddBook] = useState(false);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [categoriesRes, authorsRes] = await Promise.all([
        fetch('http://localhost:5000/categories'),
        fetch('http://localhost:5000/authors')
      ]);
      
      setCategories(await categoriesRes.json());
      setAuthors(await authorsRes.json());
      
      // Load books based on user role
      const booksUrl = user.role === 'admin' ? 
        `http://localhost:5000/books?admin_id=${user.id}` : 
        'http://localhost:5000/books';
      const booksRes = await fetch(booksUrl);
      setBooks(await booksRes.json());
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setCurrentCategory(categoryId);
    navigate('/books');
  };

  const handleBackToCategories = () => {
    setCurrentCategory(null);
    navigate('/');
  };



  const handleBookAdded = () => {
    setShowAddBook(false);
    loadData();
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogout={onLogout} 
      />
      
      {user.role === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <button
            onClick={() => setShowAddBook(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            + Add Book
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <CategoryGrid
              categories={categories}
              books={books}
              onCategorySelect={handleCategorySelect}
            />
          } />
          <Route path="/books" element={
            <BookGrid
              books={currentCategory ? books.filter(b => b.category_id === currentCategory) : books}
              categories={categories}
              authors={authors}
              user={user}
              onBack={currentCategory ? handleBackToCategories : null}
              onDataChange={loadData}
            />
          } />
          <Route path="/categories" element={
            <CategoryGrid
              categories={categories}
              books={books}
              onCategorySelect={handleCategorySelect}
            />
          } />
        </Routes>
      </main>

      {showAddBook && (
        <AddBookModal
          authors={authors.filter(a => a.user_id === user.id)}
          categories={categories}
          user={user}
          onClose={() => setShowAddBook(false)}
          onBookAdded={handleBookAdded}
        />
      )}
      

    </div>
  );
};

export default Dashboard;