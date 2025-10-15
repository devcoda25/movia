import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const GenreTag = ({ genre }) => {
  const { isDarkTheme } = useTheme();
  return (
    <View className={`px-3 py-1 rounded-full ${isDarkTheme ? 'bg-surface-dark' : 'bg-gray-200'}`}>
      <Text className={`text-xs ${isDarkTheme ? 'text-text-dark-secondary' : 'text-gray-700'}`}>
        {genre}
      </Text>
    </View>
  );
};

export default GenreTag;
