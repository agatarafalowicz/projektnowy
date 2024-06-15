import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import MenuAppBar from "./MenuAppBar";
import { useNavigate } from "react-router-dom";
import { LibraryClient } from "../api/dto/library-client";


function HomePage() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState<string | undefined>();
    const [bookId, setBookId] = useState<number | undefined>();
    const [userId, setUserId] = useState<number | undefined>(); // Dodane pole ID użytkownika

    useEffect(() => {
        const libraryClient = new LibraryClient();
        libraryClient.getCurrentUser().then(response => {
            if (response.success && response.data && response.data.userId !== undefined) {
                const userId = response.data.userId;
                libraryClient.getUserById(userId).then(userResponse => {
                    if (userResponse) {
                        setUserRole(userResponse.role);
                    }
                });
            } else {
                console.error('Failed to fetch user data:', response);
            }
        });
    }, []);

    const navigateToBooks = () => {
        navigate(`/books`);
    }

    const navigateToLoans = () => {
        navigate(`/loans`);
    }

    const navigateToAddBook = () => {
        navigate(`/add-book`);
    }

    const navigateToAddLoan = () => {
        navigate(`/add-loan`);
    }

    const navigateToAddUser = () => {
        navigate(`/add-user`);
    }

    const handleReturnBook = async () => {
        if (bookId && userId) {
            const libraryClient = new LibraryClient();
            const response = await libraryClient.returnBook(bookId, userId);
            if (response.success) {
                console.log('Book returned successfully');
            } else {
                console.error('Failed to return book:', response);
            }
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar navigateToBooks={navigateToBooks} navigateToLoans={navigateToLoans} />
            <h1>Welcome to the library</h1>
            {userRole === 'ROLE_ADMIN' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                        <Box sx={{ width: '200px', height: '200px', bgcolor: 'primary.main', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button onClick={navigateToAddBook} variant="contained" color="secondary">Add Book</Button>
                        </Box>
                        <Box sx={{ width: '200px', height: '200px', bgcolor: 'primary.main', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button onClick={navigateToAddLoan} variant="contained" color="secondary">Add Loan</Button>
                        </Box>
                        <Box sx={{ width: '200px', height: '200px', bgcolor: 'primary.main', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button onClick={navigateToAddUser} variant="contained" color="secondary">Add User</Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default HomePage;
