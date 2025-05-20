import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './AdminReviews.css';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:4000/admin/reviews/${id}`);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert("Failed to delete review.");
    }
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="admin-reviews">
      <h2>All Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Worker</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.userName}</td>
                <td>{review.workerName}</td>
                <td>{review.comment}</td>
                <td>{review.rating}⭐</td>
                <td>{new Date(review.createdat).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => deleteReview(review.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReviews;