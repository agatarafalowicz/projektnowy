import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import MenuAppBar from "./MenuAppBar";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const { token } = useParams(); // Odczytanie tokena z adresu URL
    const navigate = useNavigate();

    const navigateToBooks = () => {
        navigate(`/books/${token}`); // Dodanie tokena do adresu URL
    }

    const navigateToLoans = () => {
        navigate(`/loans/${token}`); // Dodanie tokena do adresu URL
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar navigateToBooks={navigateToBooks} navigateToLoans={navigateToLoans} />
            <h1>Welcome to the library</h1>
        </Box>
    );
}

export default HomePage;
