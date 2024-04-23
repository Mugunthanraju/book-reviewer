import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; // Import the CSS file

const ReviewList = ({ bookId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/books/${bookId}/reviews/`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [bookId]);

    return (
        <div className="container review-list">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available</p>
            )}
        </div>
    );
};

export default ReviewList;
