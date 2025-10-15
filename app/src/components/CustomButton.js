import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const CustomButton = ({ title, onPress, primary = true, className = '' }) => {
  const { colors, isDarkTheme } = useTheme();

  const buttonClasses = primary
    ? `bg-primary ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`
    : `border border-primary ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-3 px-6 rounded-lg items-center justify-center ${buttonClasses} ${className}`}
    >
      <Text className={`text-lg font-semibold ${primary ? 'text-white' : 'text-primary'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
