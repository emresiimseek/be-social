//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';

// create a component
class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF4C29" />
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
    backgroundColor: colors.loadingColor,
  },
});

//make this component available to the app
export default Loading;
