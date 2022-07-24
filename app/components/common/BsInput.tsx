//import liraries
import { IconNode, Input } from '@rneui/base';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/colors';
import { FormikErrors } from 'formik';

interface InputProps {
  label: string;
  value?: string;
  placeHolder?: string;
  onChangeText?: (text: string) => void;
  onTouchStart?: () => void;
  rightIcon?: IconNode;
  leftIcon?: IconNode;
  disabled?: boolean;
  errorMessage?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  password?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  multiline?: boolean;
  email?: boolean;
}

// create a component
const BsInput = (props: InputProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <Input
      value={props.value}
      label={props.label}
      containerStyle={{ marginVertical: 5 }}
      inputStyle={styles.input}
      style={{ height: props?.multiline ? 90 : 'auto' }}
      multiline={props.multiline}
      autoCorrect={false}
      numberOfLines={props?.multiline ? 2 : 1}
      labelStyle={
        focus || props.value
          ? { ...styles.label, color: focus ? colors.secondColor : colors.focusColor }
          : { display: 'none' }
      }
      onBlur={() => {
        props.onBlur && props.onBlur();

        setFocus(false);
      }}
      onFocus={() => {
        props.onFocus && props.onFocus();
        setFocus(true);
      }}
      textContentType={props.password ? 'oneTimeCode' : 'none'}
      keyboardType={props.email ? 'email-address' : 'default'}
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
      errorMessage={props.errorMessage?.toLocaleString()}
      secureTextEntry={props.password}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  input: { fontSize: 14 },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.focusColor,
    borderRadius: 10,
    paddingLeft: 10,
  },
  label: {
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
