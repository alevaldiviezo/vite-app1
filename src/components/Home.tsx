// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import './Container.css'; // Import the container styles

const Home: React.FC = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="container">
            <h1>Welcome to Our Website</h1>
            <p>This is the home section where you can find the latest updates and news.</p>
            <p>{message}</p> {/* Display the message from the API */}
        </div>
    );
};

export default Home;