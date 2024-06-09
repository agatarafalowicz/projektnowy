import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem, IconButton, Paper } from '@mui/material';
import CalendarIcon from '@mui/icons-material/DateRange';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LibraryClient } from "../api/dto/library-client";
import { BookResponseDto } from "../api/dto/book.dto";
import { UserResponseDto } from "../api/dto/user.dto";

const AddLoan = () => {
    const [bookId, setBookId] = useState<number | ''>('');
    const [userId, setUserId] = useState<number | ''>('');
    const [loanDate, setLoanDate] = useState<Date | null>(new Date());
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [books, setBooks] = useState<BookResponseDto[]>([]);
    const [users, setUsers] = useState<UserResponseDto[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserResponseDto[]>([]);
    const [showDueDateCalendar, setShowDueDateCalendar] = useState(false);

    useEffect(() => {
        const libraryClient = new LibraryClient();
        libraryClient.getBooks().then(response => {
            if (response.success && response.data) {
                setBooks(response.data);
            }
        });

        libraryClient.getUsers().then(response => {
            if (response.success && response.data) {
                setUsers(response.data);
                setFilteredUsers(response.data);
            }
        });
    }, []);

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = parseInt(value);
        if (!isNaN(numericValue)) {
            setUserId(numericValue);
            const filtered = users.filter(user => user.userId === numericValue);
            setFilteredUsers(filtered);
        } else {
            setUserId('');
            setFilteredUsers(users);
        }
    };

    const handleAddLoan = async () => {
        if (!bookId || !userId) {
            alert('Please fill in all required fields.');
            return;
        }

        const today = new Date();
        setLoanDate(today);

        const newLoan = {
            bookId: parseInt(bookId as unknown as string),
            userId: parseInt(userId as unknown as string),
            loanDate: today.toISOString().split('T')[0],
            dueDate: dueDate?.toISOString().split('T')[0] ?? '',
        };

        const libraryClient = new LibraryClient();
        const response = await libraryClient.addLoan(newLoan);

        if (response.success) {
            alert('Loan added successfully!');
            setBookId('');
            setUserId('');
            setDueDate(null);
        } else {
            alert('Error adding loan. Please try again later.');
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Add Loan</h2>
            <TextField
                select
                label="Book"
                value={bookId}
                onChange={(e) => setBookId(parseInt(e.target.value))}
                fullWidth
                margin="normal"
            >
                {books.map((book) => (
                    <MenuItem key={book.bookId} value={book.bookId}>
                        {book.title}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="User ID"
                value={userId}
                onChange={handleUserIdChange}
                fullWidth
                margin="normal"
            />
            <div style={{ marginBottom: '20px', position: 'relative' }}>
                <label>Due Date:</label>
                <IconButton onClick={() => setShowDueDateCalendar(!showDueDateCalendar)} sx={{ position: 'absolute', right: '10px', top: '10px' }}>
                    <CalendarIcon />
                </IconButton>
                {showDueDateCalendar && (
                    <Paper elevation={3} style={{ position: 'absolute', zIndex: 1 }}>
                        <Calendar
                            onChange={(value) => setDueDate(value as Date)}
                            value={dueDate}
                            minDate={new Date()} // Ustawia minimalną datę na dzisiaj
                            locale="en-US"
                            className="react-calendar"
                        />
                    </Paper>
                )}
            </div>
            <Button variant="contained" onClick={handleAddLoan}>Add Loan</Button>
        </Box>
    );
}

export default AddLoan;
