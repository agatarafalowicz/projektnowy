import React, { useEffect, useState } from 'react';
import './BookList.css';
import { LibraryClient, ClientResponse } from "../api/dto/library-client";
import { BookResponseDto } from "../api/dto/book.dto";

const BookList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState<BookResponseDto[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const booksPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const client = new LibraryClient();
            const response: ClientResponse<BookResponseDto[] | null> = await client.getBooks();
            if (response.success && response.data) {
                setBooks(response.data);
                setTotalPages(Math.ceil(response.data.length / booksPerPage));
            } else {
                console.error('Failed to fetch books:', response.statusCode);
            }
        };

        fetchData();
    }, []);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

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
                        <td>{book.yearOfPublication}</td>
                        <td>{book.availableCopies}</td>
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
