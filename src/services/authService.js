import axios from 'axios';


const API_URL = 'http://localhost:8080/api';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            if (response.data.token) {
                console.log("we have something: ", response.data);
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
            const response = await axios.post(`${API_URL}/register`, userData);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};
