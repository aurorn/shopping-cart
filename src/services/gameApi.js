const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const gameApi = {
  async getGamesByGenre() {
    try {
      const response = await fetch(
        `${BASE_URL}/genres?key=${API_KEY}&ordering&page_size=4`,
      );
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error Fetching Games by genre:', error);
      throw error;
    }
  },

  async getNewAndTrendingGames() {
    try {
      const response = await fetch(
        `${BASE_URL}/games/lists/main?key=${API_KEY}&discover=true&ordering=-added&page_size=16`,
      );
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching new and trending games:', error);
      throw error;
    }
  },

  async getLatestPopularGames() {
    try {
      const response = await fetch(
        `${BASE_URL}/games/lists/main?key=${API_KEY}&discover=true&ordering=-added&page_size=8`,
      );
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching new and trending games:', error);
      throw error;
    }
  },

  async getGameDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  },

  async getGameScreenshots(id) {
    try {
      const response = await fetch(
        `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching game screenshots:', error);
      throw error;
    }
  },
};
