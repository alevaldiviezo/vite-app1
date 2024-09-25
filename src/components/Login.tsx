// src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css';

const Login: React.FC = () => {
    const { login } = useAuth(); // Get login function
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/login' || 'https://vite-app1.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include', // Include cookies for session management
            });

            const data = await response.json();
            if (response.ok) {
                login(); // Call login function on successful login
                setMessage('Login successful!');
                navigate('/services'); // Navigate to /services
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='auth-form'>
                <div className='form-group'>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;