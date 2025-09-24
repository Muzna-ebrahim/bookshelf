import React, { useState } from 'react';

const AddBookModal = ({ authors, categories, user, onClose, onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isbn: '',
    publication_year: '',
    author_name: '',
    category_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author_name || !formData.category_id) {
      alert('Please fill required fields');
      return;
    }

    // First create/find author
    let authorResponse = await fetch('http://localhost:5000/authors', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: formData.author_name,
        bio: `Author created by ${user.username}`,
        birth_year: new Date().getFullYear() - 30,
        user_id: user.id
      })
    });
    
    const author = await authorResponse.json();
    const authorId = author.id;

    try {
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          isbn: formData.isbn,
          publication_year: formData.publication_year ? parseInt(formData.publication_year) : null,
          author_id: authorId,
          category_id: parseInt(formData.category_id),
          created_by: user.id
        })
      });
      
      if (response.ok) {
        alert('Book added successfully!');
        onBookAdded();
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Book</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            required
          />
          
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-24 resize-none"
          />
          
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          
          <input
            type="number"
            name="publication_year"
            placeholder="Publication Year"
            value={formData.publication_year}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          
          <input
            type="text"
            name="author_name"
            placeholder="Author Name"
            value={formData.author_name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            required
          />
          
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Add Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;