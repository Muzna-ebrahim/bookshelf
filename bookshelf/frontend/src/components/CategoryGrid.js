import React from 'react';

const CategoryGrid = ({ categories, books, onCategorySelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(category => {
          const categoryBooks = books.filter(b => b.category_id === category.id);
          return (
            <div
              key={category.id}
              className="relative h-48 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all shadow-lg"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${category.background_image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-200 text-sm mb-2">{category.description}</p>
                <span className="text-blue-200 font-semibold">{categoryBooks.length} books</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;