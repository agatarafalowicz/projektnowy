import React, { useState } from 'react';
import './LoanedList.css';

const loanedBooks = [
    { userId: '1', bookId: '1', title: 'Book 1', loanDate: '2024-05-10', dueDate: '2024-05-20', returnDate: null },
    { userId: '2', bookId: '3', title: 'Book 3', loanDate: '2024-05-12', dueDate: '2024-05-22', returnDate: '2024-05-19' },
    { userId: '1', bookId: '2', title: 'Book 2', loanDate: '2024-05-15', dueDate: '2024-05-25', returnDate: null },
    { userId: '3', bookId: '4', title: 'Book 4', loanDate: '2024-05-18', dueDate: '2024-05-28', returnDate: null },
];

const LoanedList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = loanedBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(loanedBooks.length / booksPerPage);

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
                    <th>User ID</th>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Loan Date</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                </tr>
                </thead>
                <tbody>
                {currentBooks.map((book, index) => (
                    <tr key={index}>
                        <td>{book.userId}</td>
                        <td>{book.bookId}</td>
                        <td>{book.title}</td>
                        <td>{book.loanDate}</td>
                        <td>{book.dueDate}</td>
                        <td>{book.returnDate ? book.returnDate : 'Not returned'}</td>
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

export default LoanedList;
