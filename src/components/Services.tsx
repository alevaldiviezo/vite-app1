// src/components/Services.tsx
import React, { useEffect, useState } from 'react';
import './Container.css'; // Import the container styles
import './Services.css'; // Import the card styles

const Services: React.FC = () => {
    const [services, setServices] = useState<any[]>([]); // State to hold services
    const [loading, setLoading] = useState(true); // Loading state
    // const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/services', {
                    credentials: 'omit', // Include credentials for session management
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
                // setError('Failed to fetch services. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Loading services...</div>; // Loading message
    }

    return (
        <div className="container">
            <h1>Our Services</h1>
            <div className="services-grid">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div className="service-card" key={service._id}>
                            <h2>{service.name}</h2>
                            <p>{service.price}</p>
                            <p>{service.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No services available.</p>
                )}
            </div>
        </div>
    );
};

export default Services;