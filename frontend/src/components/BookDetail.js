import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; // Import the CSS file
import ReviewForm from './ReviewForm'; // Import the ReviewForm component
import ReviewList from './ReviewList'; // Import the ReviewList component

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/books/${id}/`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    return (
        <div className="container book-detail">
            <h1>Book Detail</h1>
            {book ? (
                <div>
                    <p>Title: {book.title}</p>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Description: {book.description}</p>
                    {/* Integration of ReviewList component */}
                    <ReviewList bookId={book.id} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {/* Render the ReviewForm component */}
            {book && <ReviewForm bookId={book.id} />}
        </div>
    );
};

export default BookDetail;
