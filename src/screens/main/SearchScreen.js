import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { listMovies } from '../../api/yts';
import LoadingSpinner from '../../components/LoadingSpinner';
import MovieCard from '../../components/MovieCard';
import { debounce } from 'lodash';
import { Picker } from '@react-native-picker/picker'; 

import { QUALITY_OPTIONS, GENRE_OPTIONS, SORT_BY_OPTIONS } from '../../constants/filterOptions'; 

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isDarkTheme, colors } = useTheme();

  
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedSortBy, setSelectedSortBy] = useState('date_added');

  const fetchSearchResults = useCallback(debounce(async (query, quality, genre, sortBy) => {
    if (query.trim() === '' && quality === 'all' && genre === 'all') {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const movies = await listMovies({
        query_term: query,
        quality: quality,
        genre: genre,
        sort_by: sortBy,
        limit: 20,
      });
      setSearchResults(movies);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, 500), []);

  useEffect(() => {
    fetchSearchResults(searchQuery, selectedQuality, selectedGenre, selectedSortBy);
  }, [searchQuery, selectedQuality, selectedGenre, selectedSortBy, fetchSearchResults]);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetails', { movieId: movie.id });
  };

  const inputClasses = isDarkTheme
    ? 'bg-surface-dark text-text-dark-primary border-text-dark-secondary'
    : 'bg-surface-light text-text-light-primary border-text-light-secondary';

  const placeholderColor = isDarkTheme ? colors.textSecondary : colors.textLightSecondary;

  const pickerItemStyle = {
    color: isDarkTheme ? colors.textPrimary : colors.textLightPrimary,
    backgroundColor: isDarkTheme ? colors.surface : colors.surfaceLight,
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkTheme ? 'bg-background-dark' : 'bg-background-light'}`}>
      <View className="p-4">
        <TextInput
          className={`border rounded-lg p-3 text-base mt-4 mb-4 ${inputClasses}`}
          placeholder="Search for movies..."
          placeholderTextColor={placeholderColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View className="flex-row justify-between mb-4">
          
          <View className={`flex-1 mr-2 border rounded-lg ${isDarkTheme ? 'border-text-dark-secondary' : 'border-text-light-secondary'}`}>
            <Picker
              selectedValue={selectedQuality}
              onValueChange={(itemValue) => setSelectedQuality(itemValue)}
              style={{ height: 50 }}
              itemStyle={pickerItemStyle}
            >
              {QUALITY_OPTIONS.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>

          
          <View className={`flex-1 ml-2 border rounded-lg ${isDarkTheme ? 'border-text-dark-secondary' : 'border-text-light-secondary'}`}>
            <Picker
              selectedValue={selectedGenre}
              onValueChange={(itemValue) => setSelectedGenre(itemValue)}
              style={{ height: 50 }}
              itemStyle={pickerItemStyle}
            >
              {GENRE_OPTIONS.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>

        
        <View className={`mb-4 border rounded-lg ${isDarkTheme ? 'border-text-dark-secondary' : 'border-text-light-secondary'}`}>
          <Picker
            selectedValue={selectedSortBy}
            onValueChange={(itemValue) => setSelectedSortBy(itemValue)}
            style={{ height: 50 }}
            itemStyle={pickerItemStyle}
          >
            {SORT_BY_OPTIONS.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>

      {loading ? (
        <LoadingSpinner />
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View>
              <MovieCard movie={item} onPress={handleMoviePress} />
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={{}}
          columnWrapperStyle={{ justifyContent: 'space-around', paddingHorizontal: 2 }}
        />
      ) : searchQuery.length > 0 || selectedQuality !== 'all' || selectedGenre !== 'all' ? (
        <View className="flex-1 justify-center items-center">
          <Text className={`${isDarkTheme ? 'text-text-dark-secondary' : 'text-text-light-secondary'}`}>
            No movies found for your criteria.
          </Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className={`${isDarkTheme ? 'text-text-dark-secondary' : 'text-text-light-secondary'}`}>
            Start typing or select filters to search for movies.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;