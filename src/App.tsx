import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import './App.css'; 

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="LoginForm-container">
                <LoginForm />
            </div>
        </div>
    );
};

export default App;
