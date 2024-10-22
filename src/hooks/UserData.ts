import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    fullName: string;  // Changed from 'name' to 'fullName'
    email: string;
}

export interface UseUserDataReturn {
    user: User | null;
    token: string | null;
    error: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<boolean>;
}

// Implement fetchData function
async function fetchData(url: string, method: string, body?: object) {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // This is important for handling cookies
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    return response;
}

export function useUserData(): UseUserDataReturn {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkSession = useCallback(async (): Promise<boolean> => {
        try {
            const response = await fetchData('/api/check-session', 'GET');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setToken(data.token);
                setLoading(false);
                return true;
            } else {
                setUser(null);
                setToken(null);
                setLoading(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking session:', error);
            setUser(null);
            setToken(null);
            setLoading(false);
            return false;
        }
    }, []);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchData('/api/login', 'POST', { email, password });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setToken(data.token);
                // Set a cookie with the token
                document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict; secure`;
                router.push('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchData('/api/signup', 'POST', { email, password, name });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setToken(data.token);
                router.push('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed');
            }
        } catch (error) {
            setError('An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetchData('/api/logout', 'POST');
            if (response.ok) {
                setUser(null);
                setToken(null);
                router.push('/auth');
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
            setError('An error occurred during logout');
        } finally {
            setLoading(false);
        }
    };

    return { user, token, error, loading, login, signup, logout, checkSession };
}
