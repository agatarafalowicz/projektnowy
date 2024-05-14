import React, { useState } from 'react';
import './BookList.css';

const books = [
    { title: 'Book 1', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 2', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
    { title: 'Book 3', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 4', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
    { title: 'Book 5', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 6', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
    { title: 'Book 7', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 8', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
    { title: 'Book 9', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 10', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
    { title: 'Book 11', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 12', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
    { title: 'Book 13', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 14', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
];

const BookList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(books.length / booksPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="book-list-container">
            <table className="book-list-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Publisher</th>
                    <th>Year</th>
                    <th>Available Copies</th>
                </tr>
                </thead>
                <tbody>
                {currentBooks.map((book, index) => (
                    <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publisher}</td>
                        <td>{book.year}</td>
                        <td>{book.copies}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default BookList;
