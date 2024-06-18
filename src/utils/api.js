import axios from 'axios';
const SW_API_URL = 'https://swapi.dev/api/films/?format=json';
const OMD_API_URL = 'http://www.omdbapi.com/?apikey=23216786&';

export const fetchMovies = async () => {
    try {
        const response = await axios.get(SW_API_URL);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export const fetchPostersAndRatings = async (title, year) => {
    try {
        const response = await axios.get(OMD_API_URL, {
            params: {
                t: title,
                y: year,
            },
        });

        if (response.data.Response === 'False') {
            throw new Error(response.data.Error);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};