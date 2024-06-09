import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LibraryClient } from "../api/dto/library-client";

function AddBook() {
    const [isbn, setIsbn] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [yearOfPublication, setYearOfPublication] = useState<number>(0);
    const [availableCopies, setAvailableCopies] = useState<number>(0);

    const handleAddBook = async () => {
        const newBook = {
            isbn,
            title,
            author,
            publisher,
            yearOfPublication,
            availableCopies,
        };

        const libraryClient = new LibraryClient();
        const response = await libraryClient.addBook(newBook);

        if (response.success) {
            alert('Book added successfully!');
            setIsbn('');
            setTitle('');
            setAuthor('');
            setPublisher('');
            setYearOfPublication(0);
            setAvailableCopies(0);
        } else {
            alert('Error adding book. Please try again later.');
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Add Book</h2>
            <TextField
                label="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                type="number"
                label="Year of Publication"
                value={yearOfPublication}
                onChange={(e) => setYearOfPublication(parseInt(e.target.value))}
                fullWidth
                margin="normal"
            />
            <TextField
                type="number"
                label="Available Copies"
                value={availableCopies}
                onChange={(e) => setAvailableCopies(parseInt(e.target.value))}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleAddBook}>Add Book</Button>
        </Box>
    );
}

export default AddBook;
