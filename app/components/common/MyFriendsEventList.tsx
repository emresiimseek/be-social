//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Props } from '../../types/common/props';
import BaseComponent from './BaseComponent';

// create a component
class MyFriendsEventList extends BaseComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>MyFriendsEventList</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default MyFriendsEventList;
