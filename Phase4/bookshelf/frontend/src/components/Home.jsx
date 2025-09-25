import React from 'react';
import CategoryGrid from './CategoryGrid';

const Home = ({ categories, books, onCategorySelect }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Bookshelf</h1>
        <p className="text-gray-600">Discover and manage your reading collection</p>
      </div>
      <CategoryGrid
        categories={categories}
        books={books}
        onCategorySelect={onCategorySelect}
      />
    </div>
  );
};

export default Home;