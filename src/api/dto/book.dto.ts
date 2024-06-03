export class BookResponseDto {
    bookId: number | undefined;
    isbn: string | undefined;
    title: string | undefined;
    author: string | undefined;
    publisher: string | undefined;
    yearOfPublication: number | undefined;
    availableCopies: number | undefined;
    loanId: number | undefined;
}
