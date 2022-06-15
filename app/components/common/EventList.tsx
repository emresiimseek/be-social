import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import * as React from 'react';
import { View, Text } from 'react-native';
import EventCard from './EventCard';
import { Props } from '../../types/common/props';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlowEventData } from '../../types/strapi/models/flow-event';

export interface EventProps extends Props {
  isMine: boolean;
  event: FlowEventData;
}

export default class EventList extends React.Component<EventProps> {
  state = { userId: null };
  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userId');
    this.setState({ userId: userId });
  };
  public render() {
    return (
      <View>
        {this.props.event.getEventsByUserId.data.length ? (
          this.props.event.getEventsByUserId.data.map(event => (
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
