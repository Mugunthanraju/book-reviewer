// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import NotFound from './components/NotFound';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<BookList />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
