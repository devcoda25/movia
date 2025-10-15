import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/FontAwesome';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import MovieDetailsScreen from '../screens/main/MovieDetailsScreen';
import SearchScreen from '../screens/main/SearchScreen';
import AppSettingsScreen from '../screens/main/AppSettingsScreen'; // New Import
import FavoritesScreen from '../screens/main/FavoritesScreen';   // New Import

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const AppSettingsStack = createNativeStackNavigator(); // New Stack
const FavoritesStack = createNativeStackNavigator(); // New Stack
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </HomeStack.Navigator>
  );
};

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </SearchStack.Navigator>
  );
};

const AppSettingsNavigator = () => { // New Navigator
  return (
    <AppSettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <AppSettingsStack.Screen name="AppSettingsMain" component={AppSettingsScreen} />
    </AppSettingsStack.Navigator>
  );
};

const FavoritesNavigator = () => { // New Navigator
  return (
    <FavoritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoritesStack.Screen name="FavoritesMain" component={FavoritesScreen} />
      <FavoritesStack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </FavoritesStack.Navigator>
  );
};

const MainTabNavigator = () => {
  const { isDarkTheme, colors } = useTheme();

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: isDarkTheme ? colors.textSecondary : colors.textLightSecondary,
    tabBarStyle: {
      backgroundColor: isDarkTheme ? colors.surface : colors.surfaceLight,
      borderTopWidth: 0,
      elevation: 0, // Remove shadow on Android
    },
    tabBarLabelStyle: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchNavigator}
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab" // New Tab
        component={FavoritesNavigator}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} /> // Using 'heart' icon for favorites
          ),
        }}
      />
      <Tab.Screen
        name="AppSettingsTab" // New Tab
        component={AppSettingsNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} /> // Using 'cog' icon for settings
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={MainTabNavigator} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;