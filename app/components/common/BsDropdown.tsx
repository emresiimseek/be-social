//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropdownComponent from './DropdownComponent';
import { Props } from '../../types/common/props';

interface DropdownProps extends Props {
  items: any[];
  onChange: (category: any) => void;
  errors?: string | string[] | never[];
  label?: string;
  placeholder?: string;
}
// create a component
const BsDropdown = (props: DropdownProps) => {
  return (
    <>
      <DropdownComponent
        items={props.items ?? []}
        onChange={value => props.onChange(value)}
        dropDownLabel={props.label}
        placeholder={props.placeholder}
      >
        <Text
          style={{
            margin: 5,
            fontSize: 12,
            color: 'red',
            marginHorizontal: 15,
          }}
        >
          {props.errors}
        </Text>
      </DropdownComponent>
    </>
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
export default BsDropdown;
