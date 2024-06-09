import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LibraryClient } from "../api/dto/library-client";

function AddUser() {
    const [login, setLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

    const role = "ROLE_READER";

    const handleAddUser = async () => {
        const newUser = {
            login,
            userPassword,
            role,
            email,
            name,
        };

        const libraryClient = new LibraryClient();
        const response = await libraryClient.addUser(newUser);

        if (response.success) {
            alert('User added successfully!');
            setLogin('');
            setUserPassword('');
            setEmail('');
            setName('');
        } else {
            alert('Error adding user. Please try again later.');
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Add User</h2>
            <TextField
                label="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleAddUser}>Add User</Button>
        </Box>
    );
}

export default AddUser;
