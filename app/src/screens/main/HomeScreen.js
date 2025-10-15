import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { listMovies } from '../../api/yts';
import LoadingSpinner from '../../components/LoadingSpinner';
import HorizontalMovieList from '../../components/HorizontalMovieList';
import Rating from '../../components/Rating';

const HomeScreen = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const [latestMovies, setLatestMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const latest = await listMovies({ sort_by: 'date_added', limit: 10 });
        setLatestMovies(latest);
        if (latest.length > 0) {
          setFeaturedMovie(latest[0]);
        }

        const popular = await listMovies({ sort_by: 'like_count', limit: 10 });
        setPopularMovies(popular);

        const trending = await listMovies({ sort_by: 'download_count', limit: 10 });
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetails', { movieId: movie.id });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className={`flex-1 ${isDarkTheme ? 'bg-background-dark' : 'bg-background-light'}`}>
      <ScrollView className="flex-1">
        {featuredMovie && (
          <TouchableOpacity onPress={() => handleMoviePress(featuredMovie)} className="w-full h-80">
            <ImageBackground
              source={{ uri: featuredMovie.background_image_original || featuredMovie.large_cover_image }}
              className="flex-1 justify-end p-4"
            >
              <View className="bg-black/50 p-2 rounded-lg">
                <Text className="text-white text-2xl font-bold mb-1" numberOfLines={1}>
                  {featuredMovie.title}
                </Text>
                <View className="flex-row items-center">
                  <Rating rating={featuredMovie.rating} />
                  <Text className="text-white text-sm ml-2">{featuredMovie.year}</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}

        <View className="mt-6">
          <HorizontalMovieList title="Latest Movies" movies={latestMovies} onMoviePress={handleMoviePress} />
          <HorizontalMovieList title="Popular Movies" movies={popularMovies} onMoviePress={handleMoviePress} />
          <HorizontalMovieList title="Trending Movies" movies={trendingMovies} onMoviePress={handleMoviePress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
