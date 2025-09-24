import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookForm = ({ onSubmit, initialValues = {}, authors = [], categories = [] }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters'),
    author_id: Yup.number()
      .required('Author is required')
      .positive('Please select an author'),
    category_id: Yup.number()
      .required('Category is required')
      .positive('Please select a category'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters'),
    isbn: Yup.string()
      .matches(/^[0-9]{10,13}$/, 'ISBN must be 10-13 digits'),
    publication_year: Yup.number()
      .min(1000, 'Year must be at least 1000')
      .max(new Date().getFullYear(), 'Year cannot be in the future')
  });

  return (
    <Formik
      initialValues={{
        title: '',
        author_id: '',
        category_id: '',
        description: '',
        isbn: '',
        publication_year: '',
        ...initialValues
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">
        <div>
          <Field
            name="title"
            type="text"
            placeholder="Book Title"
            className="auth-form input"
          />
          <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <Field as="select" name="author_id" className="auth-form input">
            <option value="">Select Author</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </Field>
          <ErrorMessage name="author_id" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <Field as="select" name="category_id" className="auth-form input">
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Field>
          <ErrorMessage name="category_id" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <Field
            name="description"
            as="textarea"
            placeholder="Description"
            className="auth-form input"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <Field
            name="isbn"
            type="text"
            placeholder="ISBN (10-13 digits)"
            className="auth-form input"
          />
          <ErrorMessage name="isbn" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <Field
            name="publication_year"
            type="number"
            placeholder="Publication Year"
            className="auth-form input"
          />
          <ErrorMessage name="publication_year" component="div" className="text-red-500 text-sm" />
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default BookForm;