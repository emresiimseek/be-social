//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabStatus from '../components/common/TabStatus';
import { TabStatusItem } from '../types/common/tab-status-item';

// create a component
const NewEvent = () => {
  const items: TabStatusItem[] = [
    { title: 'Tarih', icon: { name: 'event', type: 'metarial', size: 20 }, isActive: true },
    { title: 'Detay', icon: { name: 'edit', type: 'metarial', size: 18 } },
    { title: 'Gönder', icon: { name: 'done', type: 'metarial', size: 20 } },
  ];
  return (
    <View style={styles.container}>
      <TabStatus items={items} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default NewEvent;
