import React from 'react';
import BookGrid from './BookGrid';

const Books = ({ books, categories, authors, user, onDataChange }) => {
  return (
    <BookGrid
      books={books}
      categories={categories}
      authors={authors}
      user={user}
      onBack={null}
      onDataChange={onDataChange}
    />
  );
};

export default Books;