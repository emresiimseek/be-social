import * as React from 'react';
import { View, StyleSheet, Text, Alert, ScrollView, RefreshControl } from 'react-native';
import { getEvents } from '../../logic/graphql/event';
import { useQuery, gql } from '@apollo/client';
import { EventFragment } from '../../logic/graphql/fragments/event';
import { EventsData } from '../../types/graphql/events';
import { Query } from '@apollo/client/react/components';
import Card from '../../components/common/EventCard';
import EventListComponent from '../../components/common/EventList';
import { Props } from '../../types/common/props';

export default function HomePage(props: Props) {
  return <EventListComponent navigation={props.navigation} />;
}
