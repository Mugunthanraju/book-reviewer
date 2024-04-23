import React from 'react';
import '../styles.css';

const BookReviews = ({ reviews }) => {
    return (
        <div className="container book-reviews">
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <strong>Rating:</strong> {review.rating} <br />
                            <strong>Comment:</strong> {review.comment} <br />
                            {/* Optionally, you can display the reviewer's username */}
                            {/* <strong>Reviewer:</strong> {review.reviewer.username} */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookReviews;
