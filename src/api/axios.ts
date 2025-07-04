import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/lostfound/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically add token from localStorage if it exists
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
