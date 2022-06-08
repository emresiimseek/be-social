import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ProfileHeaderComponent from '../../components/profile/ProfileHeader';
import BaseComponent from '../../components/common/BaseComponent';
import { getMe } from '../../logic/getMe';
import { User } from '../../types/strapi/strapi-user';
import { StrapiObject } from '../../types/strapi/base/strapi-object';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/common/EventCard';
import { Props } from '../../types/common/props';
import EventList from '../../components/common/EventList';

export interface ProfilePageProps extends Props {}

export interface ProfilePageState {
  user: User | null;
  events: Event[];
}

export default class ProfilePage extends BaseComponent<ProfilePageProps> {
  state: ProfilePageState = { user: null, events: [] };
  componentDidMount = () => {
    this.getMe();
  };

  getMe = async () => {
    const result = await this.handleRequest<User>(() => getMe());
    this.setState({ user: result?.data });
    this.setState({ events: result?.data?.events });
  };

  public render() {
    return (
      <View>
        <ProfileHeaderComponent navigation={this.props.navigation} />
        <EventList isMine navigation={this.props.navigation} />
      </View>
    );
  }
}
