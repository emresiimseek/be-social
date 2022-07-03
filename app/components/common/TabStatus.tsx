//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useState } from 'react';
import { Icon } from '@rneui/themed';
import { TabStatusItem } from '../../types/common/tab-status-item';
import { useEffect } from 'react';
import colors from '../../styles/colors';
import { color } from '@rneui/base';

interface TabStatusProps {
  items: TabStatusItem[];
  currentIndex: number;
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
    <View>
      <View style={styles.container}>
        {items.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  color: props.currentIndex === index ? colors.secondColor : colors.secondColorOpacity,
                  fontWeight: props.currentIndex === index ? 'bold' : 'normal',
                }}
              >
                {item.title}
              </Text>
              <Icon
                style={{ marginTop: 10 }}
                name={item.icon.name}
                type={item.icon.type}
                color={props.currentIndex === index ? colors.secondColor : colors.secondColorOpacity}
                size={item.icon.size}
              />
            </View>
            {items.length - 1 !== index && (
              <Icon name="arrow-forward" type="material" color={colors.secondColorOpacity} size={20} />
            )}
          </View>
        ))}
      </View>
      {progressWidth !== '' ? (
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View
            style={{
              width: progressWidth,
              backgroundColor: colors.secondColor,
              padding: 3,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: props.currentIndex === props.items.length - 1 ? 10 : 0,
            }}
          ></View>
        </View>
      ) : null}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.fourthColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

//make this component available to the app
export default TabStatus;
