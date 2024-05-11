import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const books = [
    { title: 'Book 1', author: 'Author 1', isbn: '1234567890', publisher: 'Publisher 1', year: 2020, copies: 5 },
    { title: 'Book 2', author: 'Author 2', isbn: '0987654321', publisher: 'Publisher 2', year: 2018, copies: 3 },
];

const BookList = () => {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto' }}>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Publisher</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Available Copies</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow key={index}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.publisher}</TableCell>
                                <TableCell>{book.year}</TableCell>
                                <TableCell>{book.copies}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BookList;
