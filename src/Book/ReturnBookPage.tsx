import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LibraryClient } from "../api/dto/library-client";

function ReturnBookPage() {
    const [bookId, setBookId] = useState<number>(0);
    const [userId, setUserId] = useState<number>(0);

    const handleReturnBook = async () => {
        const libraryClient = new LibraryClient();
        const response = await libraryClient.returnBook(bookId, userId);

        if (response.success) {
            alert('Book returned successfully!');
            setBookId(0);
            setUserId(0);
        } else {
            alert('Error returning book. Please try again later.');
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Return Book</h2>
            <TextField
                type="number"
                label="Book ID"
                value={bookId}
                onChange={(e) => setBookId(parseInt(e.target.value))}
                fullWidth
                margin="normal"
            />
            <TextField
                type="number"
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(parseInt(e.target.value))}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleReturnBook}>Return Book</Button>
        </Box>
    );
}

export default ReturnBookPage;
