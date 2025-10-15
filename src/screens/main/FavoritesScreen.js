import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useFavorites } from '../../hooks/useFavorites';
import { getMovieDetails } from '../../api/yts'; // Corrected import
import LoadingSpinner from '../../components/LoadingSpinner';
import MovieCard from '../../components/MovieCard';

const FavoritesScreen = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const { favoriteMovieIds, loadingFavorites } = useFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      setLoadingMovies(true);
      if (favoriteMovieIds.length === 0) {
        setFavoriteMovies([]);
        setLoadingMovies(false);
        return;
      }

      try {
        const movies = await Promise.all(
          favoriteMovieIds.map(async (id) => {
            const movieDetails = await getMovieDetails({ movie_id: id });
            return movieDetails;
          })
        );
        setFavoriteMovies(movies.filter(Boolean)); // Filter out nulls
      } catch (error) {
        console.error('Failed to fetch favorite movie details:', error);
      } finally {
        setLoadingMovies(false);
      }
    };

    if (!loadingFavorites) {
      fetchFavoriteMovies();
    }
  }, [favoriteMovieIds, loadingFavorites]);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetails', { movieId: movie.id });
  };

  if (loadingFavorites || loadingMovies) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className={`flex-1 ${isDarkTheme ? 'bg-background-dark' : 'bg-background-light'}`}>
      <View className="p-4">
        <Text className={`text-3xl font-bold mb-4 ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>
          Favorites
        </Text>

        {favoriteMovies.length > 0 ? (
          <FlatList
            data={favoriteMovies}
            renderItem={({ item }) => (
              <View className="w-1/2 p-2">
                <MovieCard movie={item} onPress={handleMoviePress} />
              </View>
            )}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className={`${isDarkTheme ? 'text-text-dark-secondary' : 'text-text-light-secondary'}`}>
              No favorite movies yet.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;