import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import EventCard from './EventCard';
import { Props } from '../../types/common/props';
import { USER_EVENTS, FRIENDS_EVENTS } from '../../logic/graphql/queries/getMyEvents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserEvents } from '../../types/strapi/models/user-events';
import { Variables } from '../../types/strapi/base/base';

export interface EventProps extends Props {
  isMine: boolean;
}

export default class EventList extends React.Component<EventProps> {
  state = { userId: null };
  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userId');
    this.setState({ userId: userId });
  };
  public render() {
    return (
      this.state.userId && (
        <Query<UserEvents, Variables>
          query={this.props.isMine ? USER_EVENTS : FRIENDS_EVENTS}
          variables={{ id: this.state.userId }}
        >
          {({ loading, data }) => {
            return (
              <ScrollView refreshControl={<RefreshControl refreshing={loading} />}>
                {data?.usersPermissionsUser.data &&
                  data.usersPermissionsUser.data.attributes.events.data.map(event => (
                    <EventCard
                      key={event.id}
                      item={event.attributes}
                      eventId={event.id}
                      navigation={this.props.navigation}
                    />
                  ))}
              </ScrollView>
            );
          }}
        </Query>
      )
    );
  }
}
