import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Main/HomePage';
import LoginForm from './LoginForm/LoginForm';
import BookList from './BookList';

function App() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/book" element={<BookList />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/books" element={<BookList />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}

export default App;
