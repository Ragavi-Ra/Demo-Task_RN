import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import config from '../config';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const Search = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

useFocusEffect(
  useCallback(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/companydropdown`);
        setAllCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    
    fetchCompanies();
  }, [])
);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const filtered = allCompanies.filter((item) =>
        item.company_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCompanies(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (name: string) => {
    setSearchQuery(name);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        // placeholder="Search company..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input}
      />

      {showDropdown && (
        <FlatList
          data={filteredCompanies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item.company_name)}>
              <Text style={styles.dropdownItem}>{item.company_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default Search;
