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
  const source = require(`../../assets/icons/${props.iconName}.png`);

  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      {props.iconName === 'pending' && (
        <Image style={{ height: 17, width: 17, tintColor: props.color }} source={source} />
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({});

export default BsIcon;
