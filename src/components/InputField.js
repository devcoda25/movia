import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const InputField = ({ label, placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', className = '' }) => {
  const { isDarkTheme, colors } = useTheme();

  const inputClasses = isDarkTheme
    ? 'bg-surface-dark text-text-dark-primary border-text-dark-secondary'
    : 'bg-surface-light text-text-light-primary border-text-light-secondary';

  const placeholderColor = isDarkTheme ? colors.textSecondary : colors.textLightSecondary;

  return (
    <View className={`mb-4 ${className}`}>
      {label && <Text className={`text-base font-medium mb-2 ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>{label}</Text>}
      <TextInput
        className={`border rounded-lg p-3 text-base ${inputClasses}`}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;
