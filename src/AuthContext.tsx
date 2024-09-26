// src/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;  //add username to context
    login: (username: string) => void; //update login function
    logout: () => void;
    
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username,setUsername] = useState<string | null>(null); //state for username

    const login = (user: string) => {
        setIsAuthenticated(true);
        setUsername(user); // set username on login
    }
    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null); //clear username when logout
    }

    // Check authentication status on app load
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch('http://localhost:5000/api/authenticated', {
                method: 'GET',
                credentials: 'include', // Include cookies for session management
            });
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
            if(data.authenticated){
                setUsername(data.user.username); //set username if authenticated
            }
            
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};