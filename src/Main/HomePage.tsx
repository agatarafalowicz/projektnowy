import { Box } from '@mui/material';
import MenuAppBar from "./MenuAppBar";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const navigateToBooks = () => {
        navigate('/books');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar navigateToBooks={navigateToBooks} />
        </Box>
    );
}

export default HomePage;
