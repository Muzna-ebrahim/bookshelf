import React, { useState, useEffect } from 'react';
import BookGrid from './BookGrid.jsx';

const Books = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [booksRes, categoriesRes, authorsRes] = await Promise.all([
        fetch('http://localhost:5000/books'),
        fetch('http://localhost:5000/categories'),
        fetch('http://localhost:5000/authors')
      ]);
      
      setBooks(await booksRes.json());
      setCategories(await categoriesRes.json());
      setAuthors(await authorsRes.json());
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <BookGrid
      books={books}
      categories={categories}
      authors={authors}
      user={user}
      onBack={null}
      onDataChange={loadData}
    />
  );
};

export default Books;