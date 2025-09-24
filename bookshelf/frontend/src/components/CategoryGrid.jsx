import React from 'react';

const CategoryGrid = ({ categories, books, onCategorySelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Book Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
            <p className="text-gray-600">{books.filter(b => b.category_id === category.id).length} books</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;