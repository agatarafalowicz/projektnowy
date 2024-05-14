import React from 'react';
import { Box, Button } from '@mui/material';
import MenuAppBar from "./MenuAppBar";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const navigateToBooks = () => {
        navigate('/books');
    }

    const navigateToLoans = () => {
        navigate('/loans');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar navigateToBooks={navigateToBooks} navigateToLoans={navigateToLoans} />
            <h1>Welcome to the library</h1>
        </Box>
    );
}

export default HomePage;
