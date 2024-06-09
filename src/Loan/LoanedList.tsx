import React, { useEffect, useState } from 'react';
import './LoanedList.css';
import { ClientResponse, LibraryClient } from "../api/dto/library-client";
import { LoanResponseDto } from "../api/dto/loan.dto";

const LoanedList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loans, setLoans] = useState<LoanResponseDto[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const loansPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const client = new LibraryClient();
            const response: ClientResponse<LoanResponseDto[] | null> = await client.getLoans();
            if (response.success && response.data) {
                setLoans(response.data);
                setTotalPages(Math.ceil(response.data.length / loansPerPage));
                console.log('Fetched loans:', response.data);
            } else {
                console.error('Failed to fetch loans:', response.statusCode);
            }
        };

        fetchData();
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
                {currentLoans.map((loan, index) => {
                    console.log('Rendering loan:', loan.user?.userId);
                    return (
                        <tr key={index}>
                            <td>{loan.loanId}</td>
                            <td>{loan.bookId}</td>
                            <td>{loan.loanDate}</td>
                            <td>{loan.dueDate}</td>
                            <td>{loan.returnDate}</td>
                        </tr>
                    );
                })}
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
