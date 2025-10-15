import axios from 'axios';

const BASE_URL = 'https://yts.mx/api/v2';

export const listMovies = async ({ limit = 20, page = 1, quality = 'all', genre = 'all', sort_by = 'date_added' }) => {
  try {
    const response = await axios.get(`${BASE_URL}/list_movies.json`, {
      params: {
        limit,
        page,
        quality,
        genre,
        sort_by,
      },
    });
    return response.data.data.movies;
  } catch (error) {
    console.error('Error listing movies:', error);
    return [];
  }
};

export const getMovieDetails = async ({ movie_id, with_images = true, with_cast = true }) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie_details.json`, {
      params: {
        movie_id,
        with_images,
        with_cast,
      },
    });
    return response.data.data.movie;
  } catch (error) {
    console.error('Error getting movie details:', error);
    return null;
  }
};

export const getMovieSuggestions = async ({ movie_id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie_suggestions.json`, {
      params: {
        movie_id,
      },
    });
    return response.data.data.movies;
  } catch (error) {
    console.error('Error getting movie suggestions:', error);
    return [];
  }
};
