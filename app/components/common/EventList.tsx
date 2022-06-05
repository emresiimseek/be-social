import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface EventListProps {}

export interface EventListState {}

export default class EventListComponent extends React.Component<EventListProps, EventListState> {
  public render() {
    return (
      <View>
        <Text>EventList Component</Text>
      </View>
    );
  }
}
