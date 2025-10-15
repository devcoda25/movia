import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const LoadingSpinner = ({ size = 'large' }) => {
  const { colors } = useTheme();
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
};

export default LoadingSpinner;
