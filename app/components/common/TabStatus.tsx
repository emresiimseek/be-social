//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useState } from 'react';
import { Icon } from '@rneui/themed';
import { TabStatusItem } from '../../types/common/tab-status-item';
import { useEffect } from 'react';

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
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}
          >
            <View>
              <Text
                style={{
                  color: item.isActive ? '#C06014' : 'white',
                  fontWeight: item.isActive ? 'bold' : 'normal',
                  marginBottom: 'auto',
                }}
              >
                {item.title}
              </Text>
              <Icon
                style={{ marginTop: 10 }}
                name={item.icon.name}
                type={item.icon.type}
                color={item.isActive ? '#C06014' : 'white'}
                size={item.icon.size}
              />
            </View>
            {items.length - 1 !== index && (
              <Icon name="arrow-forward" type="material" color="white" size={20} />
            )}
          </View>
        ))}
      </View>
      {progressWidth !== '' ? (
        <View style={{ width: progressWidth, backgroundColor: '#C06014', padding: 3 }}></View>
      ) : null}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#424642',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
  },
  item: { marginRight: 15 },
});

//make this component available to the app
export default TabStatus;
