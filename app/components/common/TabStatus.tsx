//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Icon } from '@rneui/themed';
import { TabStatusItem } from '../../types/common/tab-status-item';
import { useEffect } from 'react';

interface TabStatusProps {
  items: TabStatusItem[];
}

// create a component
const TabStatus = (props: TabStatusProps) => {
  const [items, setItems] = useState<TabStatusItem[]>([]);

  useEffect(() => {
    setItems(props.items);
  }, []);

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <>
          <View style={styles.item} key={index}>
            <Text
              style={{
                color: item.isActive ? '#C06014' : 'white',
                marginBottom: 2,
                fontWeight: item.isActive ? 'bold' : 'normal',
              }}
            >
              {item.title}
            </Text>
            <Icon
              name={item.icon.name}
              type={item.icon.type}
              color={item.isActive ? '#C06014' : 'white'}
              size={item.icon.size}
            />
          </View>
          {index < items.length - 1 && (
            <Icon name="arrow-forward" type="metarial" color="#F3F4ED" size={20} />
          )}
        </>
      ))}
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
    alignItems: 'center',
  },
  item: {},
});

//make this component available to the app
export default TabStatus;
