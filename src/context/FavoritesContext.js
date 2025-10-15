import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favoriteMovieIds');
        if (storedFavorites) {
          setFavoriteMovieIds(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorite movie IDs from AsyncStorage', error);
      } finally {
        setLoadingFavorites(false);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (movieId) => {
    let updatedFavorites;
    if (favoriteMovieIds.includes(movieId)) {
      updatedFavorites = favoriteMovieIds.filter((id) => id !== movieId);
    } else {
      updatedFavorites = [...favoriteMovieIds, movieId];
    }
    setFavoriteMovieIds(updatedFavorites);
    try {
      await AsyncStorage.setItem('favoriteMovieIds', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to save favorite movie IDs to AsyncStorage', error);
    }
  };

  const isFavorite = (movieId) => favoriteMovieIds.includes(movieId);

  return (
  <FavoritesContext.Provider
    value={{ favoriteMovieIds, toggleFavorite, isFavorite, loadingFavorites }}
  >
    {children}
  </FavoritesContext.Provider>
);
};