import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const ReviewForm = ({ bookId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/api/books/${bookId}/reviews/`, {
                rating,
                comment
            });
            console.log('Review submitted successfully:', response.data);
            // Optionally, you can add logic to display a success message or redirect the user
        } catch (error) {
            console.error('Error submitting review:', error);
            // Optionally, you can add logic to display an error message to the user
        }
    };

    return (
        <div className="container review-form">
            <h2>Submit a Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ReviewForm;
