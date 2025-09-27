import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config.js';

const BookCard = ({ book, category, author, user, onDataChange }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [readingStatus, setReadingStatus] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReadingStatus();
    loadReviews();
  }, [book.id, user.id]);

  const loadReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      const allReviews = await response.json();
      console.log('All reviews:', allReviews);
      console.log('Book ID:', book.id);
      const bookReviews = allReviews.filter(r => r.book_id === book.id);
      console.log('Filtered reviews for this book:', bookReviews);
      setReviews(bookReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const loadReadingStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/collections`);
      const collections = await response.json();
      const userCollection = collections.find(c => c.user_id === user.id && c.book_id === book.id);
      setReadingStatus(userCollection?.status || null);
    } catch (error) {
      console.error('Error loading reading status:', error);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      if (readingStatus) {
        // Update existing status
        const response = await fetch(`${API_BASE_URL}/collections`);
        const collections = await response.json();
        const userCollection = collections.find(c => c.user_id === user.id && c.book_id === book.id);
        
        await fetch(`${API_BASE_URL}/collections/${userCollection.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
      } else {
        // Create new collection entry
        await fetch(`${API_BASE_URL}/collections`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            book_id: book.id,
            status
          })
        });
      }
      setReadingStatus(status);
    } catch (error) {
      console.error('Error updating reading status:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await fetch(`${API_BASE_URL}/books/${book.id}`, {
          method: 'DELETE'
        });
        onDataChange();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        rating: parseInt(rating),
        content: reviewContent,
        user_id: user.id,
        book_id: book.id
      };
      console.log('Submitting review:', reviewData);
      
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);
      
      if (response.ok) {
        setShowReviewForm(false);
        setRating(5);
        setReviewContent('');
        loadReviews();
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'want_to_read': return 'bg-yellow-500';
      case 'currently_reading': return 'bg-blue-500';
      case 'read': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
         onClick={() => setShowDetails(!showDetails)}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          {readingStatus && (
            <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(readingStatus)}`}>
              {readingStatus.replace('_', ' ')}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-2">by {author?.name || 'Unknown Author'}</p>
        <p className="text-sm text-gray-500 mb-4">{category?.name || 'Uncategorized'}</p>
        
        {showDetails ? (
          <div className="space-y-2">
            {book.description && (
              <p className="text-gray-600 text-sm">{book.description}</p>
            )}
            <div className="text-xs text-gray-500 space-y-1">
              {book.publication_year && <p>Published: {book.publication_year}</p>}
              {book.isbn && <p>ISBN: {book.isbn}</p>}
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reviews ({reviews.length})</h4>
              {reviews.slice(0, 2).map(review => (
                <div key={review.id} className="bg-gray-50 p-2 rounded mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">{review.content}</p>
                </div>
              ))}
              {!showReviewForm ? (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowReviewForm(true); }}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  + Add Review
                </button>
              ) : (
                <form onSubmit={handleReviewSubmit} className="mt-2" onClick={(e) => e.stopPropagation()}>
                  <div className="mb-2">
                    <label className="text-xs text-gray-600">Rating:</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="ml-2 text-xs border rounded px-1"
                    >
                      {[1,2,3,4,5].map(num => <option key={num} value={num}>{num} ★</option>)}
                    </select>
                  </div>
                  <textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full text-xs border rounded p-2 mb-2"
                    rows="2"
                    required
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Submit</button>
                    <button type="button" onClick={() => setShowReviewForm(false)} className="bg-gray-300 px-2 py-1 rounded text-xs">Cancel</button>
                  </div>
                </form>
              )}
            </div>
            
            <div className="mt-4 space-y-2" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm font-medium text-gray-700">Reading Status:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleStatusChange('want_to_read')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    readingStatus === 'want_to_read' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-yellow-200'
                  }`}
                >
                  Want to Read
                </button>
                <button
                  onClick={() => handleStatusChange('currently_reading')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    readingStatus === 'currently_reading' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
                  }`}
                >
                  Reading
                </button>
                <button
                  onClick={() => handleStatusChange('read')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    readingStatus === 'read' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-200'
                  }`}
                >
                  Read
                </button>
              </div>
              
              {user?.role === 'admin' && (
                <div className="mt-4">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {book.description && (
              <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
            )}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {book.publication_year && `Published ${book.publication_year}`}
              </span>
              {book.isbn && (
                <span className="text-xs text-gray-500">ISBN: {book.isbn}</span>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-2 text-xs text-blue-500">
          Click to {showDetails ? 'hide' : 'show'} details
        </div>
      </div>
    </div>
  );
}

export default BookCard;