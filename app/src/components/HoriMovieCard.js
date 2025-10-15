import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import  NoImage from '../../assets/images/broken-image.png';

const HorizontalMovieCard = ({ movie, onPress }) => {
  const { isDarkTheme } = useTheme();
  const imageUrl = movie.medium_cover_image || NoImage;

  // Truncate the title to a maximum of 2 words
  const displayTitle = movie.title.split(' ').slice(0, 2).join(' ');

  return (
    <TouchableOpacity onPress={() => onPress(movie)} className="pt-2 px-2  w-44 ">
      <View className={`rounded-lg overflow-hidden ${isDarkTheme ? 'bg-surface-dark' : 'bg-surface-light'}`}>
        <Image source={{ uri: imageUrl }} className="w-full h-52" resizeMode="cover" />
        <View className="p-2">
          <Text
            className={`text-sm font-semibold ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}
            numberOfLines={2}
          >
           
            {displayTitle}
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

export default HorizontalMovieCard;