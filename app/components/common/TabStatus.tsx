//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useState } from 'react';
import { Icon } from '@rneui/themed';
import { TabStatusItem } from '../../types/common/tab-status-item';
import { useEffect } from 'react';
import colors from '../../styles/colors';
import { color } from '@rneui/base';
import { Pressable } from 'react-native';

interface TabStatusProps {
  items: TabStatusItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isValid: boolean;
  createLoading: boolean;
}

// create a component
const TabStatus = (props: TabStatusProps) => {
  const [items, setItems] = useState<TabStatusItem[]>([]);

  const [progressWidth, setProgressWidth] = useState<string>('');

  const processWithEffect = () => {
    const value = 100 / items.length;
    const index = (props.currentIndex + 1) * value;
    const widthString = `${index}%`;
    setProgressWidth(widthString);
  };

  useEffect(() => {
    processWithEffect();
  }, [items, props.currentIndex]);

  useEffect(() => {
    setItems(props.items);
    processWithEffect();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => (props.createLoading ? null : props.onIndexChange(props.currentIndex - 1))}
        style={{ position: 'absolute', left: 5, padding: 10, zIndex: 1 }}
      >
        {props.currentIndex > 0 && (
          <Icon name="chevron-back-outline" type="ionicon" color={colors.secondColor} size={25} />
        )}
      </Pressable>
      {items.map((item, index) => (
        <Pressable
          key={index}
          style={[
            styles.pressableItem,
            index === props.currentIndex ? styles.active : null,
            {
              borderBottomLeftRadius: index === 0 ? 5 : 0,
              borderBottomRightRadius: index === items.length - 1 ? 5 : 0,
            },
          ]}
        >
          <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <Text
              style={{
                color: props.currentIndex === index ? colors.secondColor : colors.secondColorOpacity,
                fontWeight: props.currentIndex === index ? 'bold' : 'normal',
              }}
            >
              {item.title}
            </Text>
            <Icon
              name={item.icon.name}
              type={item.icon.type}
              color={props.currentIndex === index ? colors.secondColor : colors.secondColorOpacity}
              size={item.icon.size}
            />
          </View>
        </Pressable>
      ))}
      <View style={{ position: 'absolute', alignSelf: 'center', right: '48%' }}>
        <Icon name="arrow-right" type="feather" color={colors.secondColor} size={25} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.fourthColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  active: {
    borderBottomWidth: 5,
    borderBottomColor: colors.secondColor,
  },
  pressableItem: { flexDirection: 'row', alignItems: 'center', flex: 1, position: 'relative' },
});

//make this component available to the app
export default TabStatus;
