import { createContext, useContext, useState, useEffect } from 'react';
import { getToken } from '../utils/token-helper';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(getToken() ? true : false);
    }
    , []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}