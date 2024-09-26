import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../AuthContext'; // Import useAuth
import './Navbar.css';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout, username } = useAuth(); // Get authentication state
    const navigate = useNavigate(); // Initialize useNavigate
    

    const handleLogout = async () => {
        await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            credentials: 'include', // Include cookies for session management
        });
        logout(); // Update authentication state
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">Home</Link></li>
                <li className="navbar-item"><Link to="/about">About</Link></li>
                <li className="navbar-item"><Link to="/contact">Contact</Link></li>
                <li className="navbar-item"><Link to="/services">Services</Link></li>
                {isAuthenticated && (
                    <li className="navbar-item"><Link to="/services"><button className="navbar-button">My Services</button></Link></li>
                )}
            </ul>
            <div className="auth-buttons">
                {isAuthenticated ? (
                    <>
                    <p className='navbar-message'>Welcome, {username}</p>
                    <button className="navbar-button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="navbar-button">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="navbar-button">Register</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;