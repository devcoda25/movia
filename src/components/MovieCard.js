import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const MovieCard = ({ movie, onPress }) => {
  const { isDarkTheme } = useTheme();
  const imageUrl = movie.medium_cover_image || 'https://via.placeholder.com/150x225.png?text=No+Image';

  return (
    <TouchableOpacity onPress={() => onPress(movie)} className="w-36 mr-4">
      <View className={`rounded-lg overflow-hidden ${isDarkTheme ? 'bg-surface-dark' : 'bg-surface-light'}`}>
        <Image source={{ uri: imageUrl }} className="w-full h-52" resizeMode="cover" />
        <View className="p-2">
          <Text
            className={`text-sm font-semibold ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}
            numberOfLines={2}
          >
            {movie.title}
          </Text>
          {movie.year && (
            <Text className={`text-xs ${isDarkTheme ? 'text-text-dark-secondary' : 'text-text-light-secondary'}`}>
              {movie.year}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
