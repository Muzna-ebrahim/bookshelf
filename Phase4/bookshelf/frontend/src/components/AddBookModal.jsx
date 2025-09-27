import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_BASE_URL } from '../config.js';

const AddBookModal = ({ authors, categories, user, onClose, onBookAdded }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters'),
    author_name: Yup.string()
      .required('Author name is required')
      .min(2, 'Author name must be at least 2 characters'),
    category_id: Yup.number()
      .required('Category is required')
      .positive('Please select a category'),
    isbn: Yup.string()
      .matches(/^[0-9]{10,13}$/, 'ISBN must be 10-13 digits'),
    publication_year: Yup.number()
      .min(1000, 'Year must be at least 1000')
      .max(new Date().getFullYear(), 'Year cannot be in the future')
  });

  const handleSubmit = async (values, { resetForm }) => {
    let authorResponse = await fetch(`${API_BASE_URL}/authors`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: values.author_name,
        bio: `Author created by ${user.username}`,
        birth_year: new Date().getFullYear() - 30,
        user_id: user.id
      })
    });
    
    const author = await authorResponse.json();
    const authorId = author.id;

    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          isbn: values.isbn,
          publication_year: values.publication_year ? parseInt(values.publication_year) : null,
          author_id: authorId,
          category_id: parseInt(values.category_id),
          created_by: user.id
        })
      });
      
      if (response.ok) {
        alert('Book added successfully!');
        resetForm();
        onBookAdded();
        onClose();
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Book</h3>
        
        <Formik
          initialValues={{
            title: '',
            description: '',
            isbn: '',
            publication_year: '',
            author_name: '',
            category_id: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                name="title"
                type="text"
                placeholder="Book Title"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <Field
                name="description"
                as="textarea"
                placeholder="Description"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-24 resize-none"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <Field
                name="isbn"
                type="text"
                placeholder="ISBN (10-13 digits)"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="isbn" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <Field
                name="publication_year"
                type="number"
                placeholder="Publication Year"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="publication_year" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <Field
                name="author_name"
                type="text"
                placeholder="Author Name"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="author_name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <Field as="select" name="category_id" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Field>
              <ErrorMessage name="category_id" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddBookModal;