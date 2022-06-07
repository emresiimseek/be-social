import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { EventFragment } from '../../logic/graphql/fragments/event';
import EventCard from './EventCard';
import { Props } from '../../types/common/props';
import { EventData } from '../../types/strapi/strapi-event';

export interface EventListState {}

const EVENTS_QUERY = gql`
query GetEvents {
  ${EventFragment}
}
`;

export default class EventListComponent extends React.Component<Props, EventListState> {
  public render() {
    return (
      <Query<EventData> query={EVENTS_QUERY}>
        {({ loading, data }) => {
          return (
            <ScrollView refreshControl={<RefreshControl refreshing={loading} />}>
              {data?.events.data.length &&
                data.events.data.map(event => (
                  <EventCard key={event.id} item={event.attributes} navigation={this.props.navigation} />
                ))}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}
