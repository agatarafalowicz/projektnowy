export class BookResponseDto {
    bookId?: number;
    isbn?: string;
    title?: string;
    author?: string;
    publisher?: string;
    yearOfPublication?: number;
    availableCopies?: number;
    loan?: {
        loanId?: number;
        user?: {
            userId?: number;
            login?: string;
            userPassword?: string;
            role?: string;
            email?: string;
            name?: string;
        };
        loanDate?: string;
        dueDate?: string;
        returnDate?: string;
    };
}
