//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BsDropdown from '../components/common/BsDropdown';

// create a component
const NewPost = () => {
  return <View style={styles.container}></View>;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default NewPost;
