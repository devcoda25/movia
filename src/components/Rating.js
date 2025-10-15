import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../hooks/useTheme';

const Rating = ({ rating }) => {
  const { colors } = useTheme();
  return (
    <View className="flex-row items-center">
      <Icon name="star" size={16} color={colors.primary} />
      <Text className={`ml-1 text-base ${colors.textPrimary}`}>{rating}</Text>
    </View>
  );
};

export default Rating;
