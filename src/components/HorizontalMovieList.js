import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MovieCard from './MovieCard';
import { useTheme } from '../hooks/useTheme';

const HorizontalMovieList = ({ title, movies, onMoviePress }) => {
  const { isDarkTheme } = useTheme();

  if (!movies || movies.length === 0) {
    return null; // Or a placeholder for no movies
  }

  return (
    <View className="mb-6">
      <Text className={`text-xl font-bold mb-3 px-4 ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>
        {title}
      </Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} onPress={onMoviePress} />}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default HorizontalMovieList;
