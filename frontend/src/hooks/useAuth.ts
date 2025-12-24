import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState<{ id: number; name: string } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedUserId = localStorage.getItem('userId');
        if (storedUser && storedUserId) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const userData = await authService.login(username, password);

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('userId', userData.id.toString());
            setUser(userData);
            setIsAuthenticated(true);
            return true;
        } catch (error: any) {
            console.error('Login failed', error);
            // Re-throw or return false. To "use the UI", we might want the caller to handle the error message.
            // Let's modify login to return the error message or throw it.
            // But to keep signature simple, let's just rethrow the message so LoginPage can catch it.
            const backendMessage = error.response?.data?.message || error.response?.data?.mensage || 'Login failed. Ensure backend is running.';
            throw new Error(backendMessage);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        setUser(null);
        setIsAuthenticated(false);
    };

    return { user, isAuthenticated, login, logout };
};
