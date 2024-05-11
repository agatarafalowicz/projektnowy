import {Box} from '@mui/material';
import MenuAppBar from "./MenuAppBar";

function HomePage(){
    return (
        <Box sx={{flexGrow: 1}}>
            <MenuAppBar />
        </Box>
    );
}

export default HomePage;