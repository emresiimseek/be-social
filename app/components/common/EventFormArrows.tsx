//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

interface EventFormArrowsProps {
  currentIndex: number;
  itemsLength: number;
  onIndexChange: (index: number) => void;
}
// create a component
const EventFormArrows = (props: EventFormArrowsProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
          props.currentIndex === 0
            ? 'flex-end'
            : props.currentIndex === props.itemsLength - 1
            ? 'flex-start'
            : 'space-between',
        padding: 10,
        width: '100%',
      }}
    >
      {props.currentIndex > 0 && (
        <View>
          <Icon
            onPress={() => props.onIndexChange(props.currentIndex - 1)}
            type="evilicon"
            name="arrow-left"
            color="#C06014"
            size={50}
          />
        </View>
      )}
      {/* Direction Buttons */}
      {props.currentIndex < props.itemsLength - 1 && (
        <View>
          <Icon
            onPress={() => props.onIndexChange(props.currentIndex + 1)}
            type="evilicon"
            name="arrow-right"
            color="#C06014"
            size={50}
          />
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default EventFormArrows;
