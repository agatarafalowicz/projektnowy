import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from "@mui/icons-material";

interface MenuAppBarProps {
    navigateToBooks: () => void;
}

export default function MenuAppBar({ navigateToBooks }: MenuAppBarProps) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
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
                        aria-label="books"
                        sx={{ mr: 2 }}
                        onClick={navigateToBooks}
                    >
                        Books
                    </IconButton>
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
        </AppBar>
    );
}
