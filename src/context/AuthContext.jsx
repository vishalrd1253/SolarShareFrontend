import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
const fetchUserProfile = async (jwtToken) => {
    try {
        const response = await fetch('https://solar-share-backend.onrender.com/api/users/me', {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const userData = await response.json();
            console.log("Fetched User Profile:", userData);
            setUser(userData);
        } else {
            navigate("/login");
        }
    } catch (error) {
        logout();
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
        fetchUserProfile(storedToken);
    } else {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    }
}, [token]);

    const login = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        toast.success("Logout Successful");
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, user,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
