import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};
