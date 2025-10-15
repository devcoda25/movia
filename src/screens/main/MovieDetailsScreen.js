import { useFavorites } from '../../hooks/useFavorites'; // New import
import Icon from 'react-native-vector-icons/FontAwesome'; // Already imported in AppNavigator, but good to be explicit here

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { getMovieDetails, getMovieSuggestions } from '../../api/yts';
import { constructMagnetLink } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';
import GenreTag from '../../components/GenreTag';
import Rating from '../../components/Rating';
import CustomButton from '../../components/CustomButton';
import HorizontalMovieList from '../../components/HorizontalMovieList';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const { isDarkTheme, colors } = useTheme(); // Get colors for icon
  const { isFavorite, toggleFavorite } = useFavorites(); // Use favorites hook
  const [movie, setMovie] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const movieDetails = await getMovieDetails({ movie_id: movieId });
        setMovie(movieDetails);

        const movieSuggestions = await getMovieSuggestions({ movie_id: movieId });
        setSuggestions(movieSuggestions);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleDownload = () => {
    if (movie && movie.torrents && movie.torrents.length > 0) {
      const latestTorrent = movie.torrents[0]; // Get the first torrent, usually highest quality
      const magnetLink = constructMagnetLink(latestTorrent.hash, movie.title);
      if (magnetLink) {
        Linking.openURL(magnetLink)
          .then(() => {
            Alert.alert('Download Initiated', 'Attempting to open magnet link in an external app.');
          })
          .catch(err => {
            console.error('Failed to open magnet link:', err);
            Alert.alert('Download Failed', 'Could not open magnet link. Please ensure you have a torrent client installed.');
          });
      } else {
        Alert.alert('Download Failed', 'Could not construct a valid magnet link.');
      }
    } else {
      Alert.alert('Download Failed', 'No torrents available for this movie.');
    }
  };

  const handleToggleFavorite = () => {
    if (movie) {
      toggleFavorite(movie.id);
    }
  };

  const handleMoviePress = (suggestedMovie) => {
    navigation.push('MovieDetails', { movieId: suggestedMovie.id });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!movie) {
    return (
      <SafeAreaView className={`flex-1 justify-center items-center ${isDarkTheme ? 'bg-background-dark' : 'bg-background-light'}`}>
        <Text className={`${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>Movie not found.</Text>
      </SafeAreaView>
    );
  }

  const favoriteIconName = isFavorite(movieId) ? 'heart' : 'heart-o'; // Filled heart if favorite, outline if not
  const favoriteIconColor = isFavorite(movieId) ? colors.primary : (isDarkTheme ? colors.textPrimary : colors.textLightPrimary);

  return (
    <SafeAreaView className={`flex-1 ${isDarkTheme ? 'bg-background-dark' : 'bg-background-light'}`}>
      <ScrollView className="flex-1">
        <Image
          source={{ uri: movie.large_cover_image || movie.background_image_original }}
          className="w-full h-96"
          resizeMode="cover"
        />
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-2"> {/* New View for title and favorite button */}
            <Text className={`text-3xl font-bold ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`} style={{ flexShrink: 1 }}>
              {movie.title}
            </Text>
            <TouchableOpacity onPress={handleToggleFavorite} className="ml-4">
              <Icon name={favoriteIconName} size={30} color={favoriteIconColor} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mb-2">
            <Rating rating={movie.rating} />
            <Text className={`ml-2 text-lg ${isDarkTheme ? 'text-text-dark-secondary' : 'text-text-light-secondary'}`}>
              {movie.year}
            </Text>
          </View>
          <View className="flex-row flex-wrap mb-4">
            {movie.genres && movie.genres.map((genre, index) => (
              <View key={index} className="mr-2 mb-2">
                <GenreTag genre={genre} />
              </View>
            ))}
          </View>
          <Text className={`text-base mb-4 ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>
            {movie.description_full}
          </Text>

          {movie.cast && movie.cast.length > 0 && (
            <View className="mb-4">
              <Text className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>
                Cast
              </Text>
              {movie.cast.map((person, index) => (
                <Text key={index} className={`text-base ${isDarkTheme ? 'text-text-dark-secondary' : 'text-text-light-secondary'}`}>
                  {person.name} {person.character_name ? `as ${person.character_name}` : ''}
                </Text>
              ))}
            </View>
          )}

          {movie.torrents && movie.torrents.length > 0 && (
            <CustomButton title="Get Magnet Link" onPress={handleDownload} className="mt-4" />
          )}

          {suggestions.length > 0 && (
            <View className="mt-8">
              <HorizontalMovieList title="More Like This" movies={suggestions} onMoviePress={handleMoviePress} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailsScreen;
