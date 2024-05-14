import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from "@mui/icons-material";
import { Link } from 'react-router-dom';

interface MenuAppBarProps {
    navigateToBooks: () => void;
    navigateToLoans?: () => void;
}

export default function MenuAppBar({ navigateToBooks, navigateToLoans }: MenuAppBarProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Library
                </Typography>
                <Box>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="account"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => console.log("Navigate to login")}
                        sx={{ mr: 2 }}
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem component={Link} to="/books" onClick={handleMenuClose}>Books</MenuItem>
                {navigateToLoans && <MenuItem component={Link} to="/loans" onClick={handleMenuClose}>Loans</MenuItem>}
            </Menu>
        </AppBar>
    );
}
