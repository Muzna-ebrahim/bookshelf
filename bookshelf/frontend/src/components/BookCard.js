import React, { useState } from 'react';

const BookCard = ({ book, category, author, user, onDataChange }) => {
  const [status, setStatus] = useState('');

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Philosophy': 'purple-500',
      'Programming': 'green-500',
      'Science Fiction': 'blue-500',
      'History': 'yellow-500'
    };
    return colors[categoryName] || 'gray-500';
  };

  const handleStatusChange = async (newStatus) => {
    if (!newStatus) return;
    
    try {
      const response = await fetch('http://localhost:5000/collections', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: user.id,
          book_id: book.id,
          status: newStatus
        })
      });
      
      if (response.ok) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://localhost:5000/books/${book.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Book deleted successfully!');
          onDataChange();
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 hover:shadow-xl transition-all">
      <div
        className="h-48 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${category.background_image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 p-4 rounded-xl text-center max-w-xs">
            <h3 className="font-bold text-gray-800 text-lg mb-1">{book.title}</h3>
            <p className="text-sm text-gray-600">{author?.name}</p>
          </div>
        </div>
        <div className={`absolute top-3 right-3 bg-${getCategoryColor(category.name)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
          {category.name}
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {book.description || 'No description available'}
        </p>
        
        {user.role === 'reader' ? (
          <>
            <div className="text-xs text-purple-600 font-semibold mb-3 px-2 py-1 bg-purple-100 rounded-lg inline-block">
              {status ? status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not Started'}
            </div>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="want-to-read">Want to Read</option>
              <option value="reading">Currently Reading</option>
              <option value="read">Completed</option>
            </select>
          </>
        ) : (
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;