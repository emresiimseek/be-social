//import liraries
import { SearchBar } from '@rneui/themed';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Icon } from '@rneui/themed';

// create a component
const Search = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={text => setSearch(text)}
        platform={Platform.OS == 'ios' ? 'ios' : 'android'}
        value={search}
        showLoading={false}
        showCancel={false}
        cancelButtonTitle=""
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default Search;
