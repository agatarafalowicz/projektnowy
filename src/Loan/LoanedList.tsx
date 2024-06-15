import React, { useEffect, useState } from 'react';
import './LoanedList.css';
import { ClientResponse, LibraryClient } from "../api/dto/library-client";
import { LoanResponseDto } from "../api/dto/loan.dto";
import { UserResponseDto } from "../api/dto/user.dto";

const LoanedList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loans, setLoans] = useState<LoanResponseDto[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const loansPerPage = 10;

    useEffect(() => {
        const fetchLoansForCurrentUser = async () => {
            const client = new LibraryClient();
            const currentUserResponse: ClientResponse<UserResponseDto | null> = await client.getCurrentUser();

            if (currentUserResponse.success && currentUserResponse.data) {
                const userId = currentUserResponse.data.userId?.toString();
                if (userId) {
                    const loansResponse: ClientResponse<LoanResponseDto[] | null> = await client.getLoans();
                    if (loansResponse.success && loansResponse.data?.filter(loan => loan.userId?.userId?.toString() === userId)) {
                        setLoans(loansResponse.data?.filter(loan => loan.userId?.userId?.toString() === userId));
                        console.log(loansResponse.data?.filter(loan => loan.userId?.userId?.toString() === userId))
                        setTotalPages(Math.ceil(loansResponse.data.length / loansPerPage));
                        console.log('Fetched loans for user:', loansResponse.data);
                    } else {
                        console.error('Failed to fetch loans:', loansResponse.statusCode);
                    }
                } else {
                    console.error('User ID is undefined');
                }
            } else {
                console.error('Failed to fetch current user:', currentUserResponse.statusCode);
            }
        };

        fetchLoansForCurrentUser();
    }, []);

    const indexOfLastLoan = currentPage * loansPerPage;
    const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
    const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="loan-list-container">
            <table className="loan-list-table">
                <thead>
                <tr>
                    <th>Loan ID</th>
                    <th>Book ID</th>
                    <th>Loan date</th>
                    <th>Due date</th>
                    <th>Return date</th>
                </tr>
                </thead>
                <tbody>
                {currentLoans.map((loan, index) => (
                    <tr key={index}>
                        <td>{loan.loanId}</td>
                        <td>{loan.bookId && loan.bookId.bookId}</td>
                        <td>{loan.loanDate}</td>
                        <td>{loan.dueDate}</td>
                        <td>{loan.returnDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default LoanedList;
