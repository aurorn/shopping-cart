const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const gameApi = {
    async getFeaturedGames() {
        try {
            const response = await fetch(
                `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page_size=10`
            );
            if(!response.ok) {
                throw new Error('Network Response Error');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    },

    async getGamesByGenre() {
        try {
            const response = await fetch(
                `${BASE_URL}/genres?key=${API_KEY}&ordering&page_size=4`
            );
            if (!response.ok) {
                throw new Error('Network Response Error');
            }
            const data = await response.json();
            return data.results
        } catch (error) {
            console.error('Error Fetching Games by genre:', error);
            throw error;
        }
    }
};