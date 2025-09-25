import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryGrid from './CategoryGrid.jsx';
import AddBookModal from './AddBookModal.jsx';

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
    <div>
      {user.role === 'admin' && (
        <div className="mb-4">
          <button
            onClick={() => setShowAddBook(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            + Add Book
          </button>
        </div>
      )}

      <CategoryGrid
        categories={categories}
        books={books}
        onCategorySelect={handleCategorySelect}
      />

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