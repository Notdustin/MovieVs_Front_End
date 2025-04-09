import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const movieService = {
    getMovieBattlePair: async () => {
        try {
            const response = await axios.get(`${API_URL}/movies/battle-pair`);
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
