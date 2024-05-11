import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface Book {
    id: number;
    title: string;
    author: string;
}

interface BookListProps {
    books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    return (
        <List>
            {books.map(book => (
                <ListItem key={book.id}>
                    <ListItemText primary={book.title} secondary={book.author} />
                </ListItem>
            ))}
        </List>
    );
};

export default BookList;
