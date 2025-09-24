import React, { useState, useEffect } from 'react';
import BookCard from './BookCard.jsx';

const MyBooks = ({ user }) => {
  const [collections, setCollections] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('want_to_read');

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [collectionsRes, booksRes, authorsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:5000/collections'),
        fetch('http://localhost:5000/books'),
        fetch('http://localhost:5000/authors'),
        fetch('http://localhost:5000/categories')
      ]);
      
      const allCollections = await collectionsRes.json();
      const userCollections = allCollections.filter(c => c.user_id === user.id);
      
      setCollections(userCollections);
      setBooks(await booksRes.json());
      setAuthors(await authorsRes.json());
      setCategories(await categoriesRes.json());
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const getBooksByStatus = (status) => {
    const bookIds = collections.filter(c => c.status === status).map(c => c.book_id);
    return books.filter(book => bookIds.includes(book.id));
  };

  const tabs = [
    { key: 'want_to_read', label: 'Want to Read', color: 'yellow' },
    { key: 'currently_reading', label: 'Currently Reading', color: 'blue' },
    { key: 'read', label: 'Read', color: 'green' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Books</h2>
      
      <div className="flex space-x-1 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? `bg-${tab.color}-500 text-white`
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label} ({getBooksByStatus(tab.key).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {getBooksByStatus(activeTab).map(book => (
          <BookCard
            key={book.id}
            book={book}
            category={categories.find(c => c.id === book.category_id)}
            author={authors.find(a => a.id === book.author_id)}
            user={user}
            onDataChange={loadData}
          />
        ))}
      </div>
      
      {getBooksByStatus(activeTab).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books in "{tabs.find(t => t.key === activeTab)?.label}" yet.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Click on any book and set its reading status to add it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBooks;