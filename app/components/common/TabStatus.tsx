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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: '7%' }}>
        {props.currentIndex > 0 && (
          <Icon
            onPress={() => (props.createLoading ? null : props.onIndexChange(props.currentIndex - 1))}
            name="chevron-back-outline"
            type="ionicon"
            color={colors.secondColor}
            size={25}
          />
        )}
      </View>

      <View style={styles.container}>
        {items.map((item, index) => (
          <Pressable
            onPress={() =>
              index > 0 && props.isValid && !props.createLoading ? props.onIndexChange(index) : null
            }
            key={index}
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                borderBottomLeftRadius: index === 0 ? 5 : 0,
                borderBottomRightRadius: index === items.length - 1 ? 5 : 0,
              },
              index === props.currentIndex ? styles.active : null,
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
            {items.length - 1 !== index && (
              <Icon name="arrow-right" type="feather" color={colors.secondColor} size={25} />
            )}
          </Pressable>
        ))}
      </View>
      <View style={{ width: '7%' }}></View>
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
    marginVertical: 10,
    borderRadius: 5,
    width: '86%',
  },
  active: {
    borderBottomWidth: 5,
    borderBottomColor: colors.secondColor,
  },
});

//make this component available to the app
export default TabStatus;
