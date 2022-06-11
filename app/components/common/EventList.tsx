import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import EventCard from './EventCard';
import { Props } from '../../types/common/props';
import { FRIENDS_EVENTS, USER_EVENTS } from '../../logic/graphql/queries/getMyEvents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserEvents, UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { Variables } from '../../types/strapi/base/base';

export interface EventProps extends Props {
  isMine: boolean;
  user: UsersPermissionsUser;
}

export default class EventList extends React.Component<EventProps> {
  state = { userId: null };
  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userId');
    this.setState({ userId: userId });
  };
  public render() {
    const events = this.props.user?.usersPermissionsUser?.data.attributes.events.data;

    return (
      <View>
        {events.length ? (
          events.map(event => (
            <EventCard
              key={event.id}
              item={event.attributes}
              eventId={event.id}
              navigation={this.props.navigation}
            />
          ))
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}
