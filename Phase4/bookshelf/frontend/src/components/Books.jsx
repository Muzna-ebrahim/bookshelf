import React, { useState, useEffect } from 'react';
import BookGrid from './BookGrid.jsx';
import { API_BASE_URL } from '../config.js';

const Books = ({ user, selectedCategory }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [booksRes, categoriesRes, authorsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/books`),
        fetch(`${API_BASE_URL}/categories`),
        fetch(`${API_BASE_URL}/authors`)
      ]);
      
      setBooks(await booksRes.json());
      setCategories(await categoriesRes.json());
      setAuthors(await authorsRes.json());
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filteredBooks = selectedCategory 
    ? books.filter(book => book.category_id === selectedCategory)
    : books;

  return (
    <BookGrid
      books={filteredBooks}
      categories={categories}
      authors={authors}
      user={user}
      onBack={() => window.history.back()}
      onDataChange={loadData}
    />
  );
};

export default Books;