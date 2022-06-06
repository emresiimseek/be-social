import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getEvents } from '../../logic/graphql/event';
import { useQuery, gql } from '@apollo/client';
import { EventFragment } from '../../logic/graphql/fragments/event';
import { EventsData } from '../../types/graphql/events';

const EVENTS = gql`
query GetEvents {
  ${EventFragment}
}
`;

export default function HomePage() {
  const { loading, error, data } = useQuery<EventsData>(EVENTS);

  return (
    <View>
      <Text></Text>
    </View>
  );
}
