//import liraries
import { IconNode, Input } from '@rneui/base';
import React, { Component, lazy } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/colors';

interface InputProps {
  label: string;
  value?: string;
  placeHolder?: string;
  onChangeText?: (text: string) => void;
  onTouchStart?: () => void;
  rightIcon?: IconNode;
  leftIcon?: IconNode;
  disabled?: boolean;
  errorMessage?: string;
  password?: boolean;
}

// create a component
const BsInput = (props: InputProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <Input
      value={props.value}
      label={props.label}
      inputStyle={styles.input}
      labelStyle={
        focus || props.value
          ? { ...styles.label, color: focus ? colors.secondColor : colors.focusColor }
          : { display: 'none' }
      }
      onBlur={() => setFocus(false)}
      onFocus={() => {
        setFocus(true);
      }}
      inputContainerStyle={{
        ...styles.inputContainer,
        borderColor: focus ? colors.secondColor : colors.focusColor,
      }}
      placeholder={focus ? '' : props.placeHolder ?? props.label}
      onChangeText={value => (props.onChangeText ? props?.onChangeText(value) : null)}
      rightIcon={props.rightIcon}
      leftIcon={props.leftIcon}
      disabled={props.disabled}
      onTouchStart={() => (props.onTouchStart ? props.onTouchStart() : null)}
      errorStyle={{ color: 'red' }}
      errorMessage={props.errorMessage}
      secureTextEntry={props.password}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  input: { fontSize: 16 },
  inputContainer: { borderWidth: 1, borderColor: colors.focusColor, borderRadius: 10, paddingLeft: 10 },
  label: {
    paddingBottom: 5,
    position: 'absolute',
    backgroundColor: 'white',
    left: 25,
    top: -7,
    zIndex: 999,
    fontSize: 14,
  },
});

//make this component available to the app
export default BsInput;
