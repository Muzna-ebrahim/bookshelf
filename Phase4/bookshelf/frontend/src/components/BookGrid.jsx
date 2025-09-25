import React from 'react';
import BookCard from './BookCard.jsx';

const BookGrid = ({ books, categories, authors, user, onBack, onDataChange }) => {
  const category = categories.find(c => c.id === books[0]?.category_id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {category ? `${category.name} Books` : 'All Books'}
        </h2>
        {onBack && (
          <button
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            ← Back to Categories
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            category={categories.find(c => c.id === book.category_id)}
            author={authors.find(a => a.id === book.author_id)}
            user={user}
            onDataChange={onDataChange}
          />
        ))}
      </div>
      
      {books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default BookGrid;