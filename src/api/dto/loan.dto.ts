export class LoanResponseDto {
    loanId: number | undefined;
    userId: {
        userId: number | undefined;
        login: string | undefined;
        userPassword: string | undefined;
        role: string | undefined;
        email: string | undefined;
        name: string | undefined;
    } | undefined;
    loanDate: string | undefined;
    dueDate: string | undefined;
    returnDate: string | undefined;
}
