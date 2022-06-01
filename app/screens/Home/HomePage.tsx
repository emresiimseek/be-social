import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Props } from '../../types/common/props';

export interface HomePageProps extends Props {}

export interface HomePageState {}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View>
        <Text>HomePage Component</Text>
      </View>
    );
  }
}
