//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Props } from '../../types/common/props';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import { Icon } from '@rneui/themed';
import { Button } from '@rneui/base';
import { navigate } from '../../RootNavigation';

interface NewButtonProps extends Props {
  focused: boolean;
  setFocus: (focus: boolean) => void;
}

// create a component
const NewButtons = (props: NewButtonProps) => {
  const translateXAnimRight = new Animated.Value(500);
  const translateXAnimLeft = new Animated.Value(-500);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(translateXAnimRight, { toValue: 0, duration: 400, useNativeDriver: true }).start();
    Animated.timing(translateXAnimLeft, { toValue: 0, duration: 400, useNativeDriver: true }).start();

    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, [translateXAnimRight]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {props.focused && (
        <>
          <Pressable
            onPress={() => {
              props.setFocus(false);
            }}
            style={{
              position: 'absolute',
              top: -Dimensions.get('window').height,
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          ></Pressable>
          <Animated.View
            style={[
              { bottom: 120, position: 'absolute' },
              { transform: [{ translateX: translateXAnimRight }], opacity: fadeAnim },
            ]}
          >
            <Button
              color="rgba(255,255,255,255.5)"
              onPress={() => {
                props.setFocus(false);
                navigate('NewPost');
              }}
              iconPosition="right"
              title="Gönderi Paylaş"
              containerStyle={{ borderRadius: 5 }}
              titleStyle={{ color: colors.secondColor, fontSize: 14 }}
              icon={{
                name: 'plus-box-multiple',
                type: 'material-community',
                color: colors.secondColor,
                size: 20,
              }}
              size="lg"
              style={{
                width: Dimensions.get('window').width / 2.5,
                padding: 0,
              }}
            />
          </Animated.View>
          <Animated.View
            style={[
              { transform: [{ translateX: translateXAnimLeft }], opacity: fadeAnim },
              { bottom: 70, position: 'absolute' },
            ]}
          >
            <Button
              color="rgba(255,255,255,255.5)"
              onPress={() => {
                props.setFocus(false);
                navigate('NewEvent');
              }}
              icon={{
                name: 'calendar',
                type: 'material-community',
                color: colors.secondColor,
                size: 20,
              }}
              iconPosition="right"
              title="Etkinlik Oluştur"
              titleStyle={{ color: colors.secondColor, fontSize: 14 }}
              containerStyle={{
                borderRadius: 5,
              }}
              style={{
                width: Dimensions.get('window').width / 2.5,
              }}
              size="lg"
            />
          </Animated.View>
        </>
      )}

      <TouchableOpacity onPress={() => props.setFocus(!props.focused)}>
        <Icon type="feather" name="plus-circle" size={50} color={colors.secondColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    flex: 1,
    marginBottom: 5,
    borderRadius: 10,
    minWidth: 500,
  },
  shadow: {
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default NewButtons;
