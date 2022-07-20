//import liraries
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

interface IconProps {
  iconName: string;
  color: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
// create a component
const BsIcon = (props: IconProps) => {
  const data = `../../assets/icons/${props.iconName}.png`;
  console.log(data, 'Data');

  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      {props.iconName === 'pending' && (
        <Image
          style={{ height: 17, width: 17, tintColor: '#3AB4F2' }}
          source={require(`../../assets/icons/wall-clock.png`)}
        />
      )}
      {props.iconName === 'refect' && (
        <Image
          style={{ height: 19, width: 19, tintColor: '#F47C7C' }}
          source={require(`../../assets/icons/cross-button.png`)}
        />
      )}
      {props.iconName === 'accept' && (
        <Image
          style={{ height: 18, width: 18, tintColor: '#6BCB77' }}
          source={require(`../../assets/icons/accept.png`)}
        />
      )}
    </TouchableOpacity>
  );
};

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
export default BsIcon;
