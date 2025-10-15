import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import CustomButton from '../../components/CustomButton'; // Import CustomButton
import Constants from 'expo-constants'; // To get app version

const AppSettingsScreen = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const appVersion = Constants.expoConfig.version; // Get app version from app.json

  return (
    <SafeAreaView className={`flex-1 justify-center items-center ${isDarkTheme ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Text className={`text-3xl font-bold mb-8 ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>
        App Settings
      </Text>

      <CustomButton
        title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} Theme`}
        onPress={toggleTheme}
        className="mt-4 w-4/5"
      />

      <View className="mt-8 items-center">
        <Text className={`text-lg ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>
          Version: {appVersion}
        </Text>
        <Text className={`text-lg ${isDarkTheme ? 'text-text-dark-primary' : 'text-text-light-primary'}`}>
          Developer: Devcoda
        </Text>
      </View>
      {/* Add settings options here */}
    </SafeAreaView>
  );
};

export default AppSettingsScreen;
