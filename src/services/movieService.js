import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const movieService = {
    getMovieBattlePair: async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`${API_URL}/battle`, {
                headers: {
                    'Authorization': `${user.token}`
                }
            });
            console.log("Battle pair:", response.data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getTopTwentyList: async () => {
        try {
            const response = await axios.get(`${API_URL}/movies/top-twenty`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Optional: Add method to submit battle winner
    submitBattleWinner: async (winnerId, loserId) => {
        try {
            const response = await axios.post(`${API_URL}/movies/battle-result`, {
                winnerId,
                loserId
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
