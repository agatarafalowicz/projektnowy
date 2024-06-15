import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import {LibraryClient} from "../api/dto/library-client";

interface MenuAppBarProps {
    navigateToBooks: () => void;
    navigateToLoans?: () => void;
}

const libraryClient = new LibraryClient();

export default function MenuAppBar({ navigateToBooks, navigateToLoans }: MenuAppBarProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleMenuClose();
        setLogoutDialogOpen(true);
    };

    const confirmLogout = async () => {
        console.log('User is logging out');
        const logoutSuccessful = await libraryClient.logout();
        if (logoutSuccessful) {
            navigate('/login');
        } else {
            console.log('Logout cancelled');
        }
        setLogoutDialogOpen(false);
    };

    const cancelLogout = () => {
        setLogoutDialogOpen(false);
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
                        onClick={handleLogout}
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

            {}
            <Dialog open={logoutDialogOpen} onClose={cancelLogout}>
                <DialogTitle>Are you sure you want to log out?</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to log out?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmLogout} color="primary">Yes</Button>
                    <Button onClick={cancelLogout} color="primary" autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
}
