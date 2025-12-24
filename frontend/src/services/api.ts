import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to inject the userId header
api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        config.headers.userId = userId;
    }
    return config;
});

export default api;
