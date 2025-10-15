import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/FontAwesome';


import HomeScreen from '../screens/main/HomeScreen';
import MovieDetailsScreen from '../screens/main/MovieDetailsScreen';
import SearchScreen from '../screens/main/SearchScreen';
import AppSettingsScreen from '../screens/main/AppSettingsScreen'; 
import FavoritesScreen from '../screens/main/FavoritesScreen';   

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const AppSettingsStack = createNativeStackNavigator(); 
const FavoritesStack = createNativeStackNavigator(); 
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

const AppSettingsNavigator = () => { 
  return (
    <AppSettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <AppSettingsStack.Screen name="AppSettingsMain" component={AppSettingsScreen} />
    </AppSettingsStack.Navigator>
  );
};

const FavoritesNavigator = () => { 
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
      elevation: 0, 
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
        name="FavoritesTab" 
        component={FavoritesNavigator}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} /> 
          )
        }}
      />
      <Tab.Screen
        name="AppSettingsTab"
        component={AppSettingsNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
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