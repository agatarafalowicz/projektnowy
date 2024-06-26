import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from "./Main/HomePage";
import LoginForm from "./LoginForm/LoginForm";
import ApiProvider from "./api/dto/ApiProvider";
import BookList from "./Book/BookList";
import LoanedList from "./Loan/LoanedList";
import AddBook from "./Book/AddBook";
import AddLoan from './Loan/AddLoan';
import AddUser from './User/AddUser';

function App() {
    return (
        <BrowserRouter>
            <ApiProvider>
                <Routes>
                    <Route path="/home" element={<HomePage />}>
                        <Route
                            path="1"
                            element={
                                <div
                                    style={{
                                        height: '300px',
                                        width: '100%',
                                        backgroundColor: 'red',
                                    }}
                                />
                            }
                        />
                        <Route
                            path="2"
                            element={
                                <div
                                    style={{
                                        height: '300px',
                                        width: '100%',
                                        backgroundColor: 'blue',
                                    }}
                                />
                            }
                        />
                    </Route>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/loans" element={<LoanedList />} />
                    <Route path="/add-book" element={<AddBook/>} />
                    <Route path="/add-loan" element={<AddLoan />} />
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </ApiProvider>
        </BrowserRouter>
    );
}

export default App;