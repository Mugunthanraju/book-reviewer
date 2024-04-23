import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const BookList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Book List</h1>
            <input
                type="text"
                placeholder="Search by title, author, or genre"
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <ul className="book-list">
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        <Link to={`/book/${book.id}`}>
                            <strong>{book.title}</strong> by {book.author}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
