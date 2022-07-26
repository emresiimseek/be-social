//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventCard } from '../components/common/EventCard';
import { Props } from '../types/common/props';
import { useQuery } from '@apollo/client';
import { GET_EVENTS_BY_USER_ID } from '../logic/graphql/queries/getEventsById';
import { useState } from 'react';
import { useEffect } from 'react';

// create a component
const EventDetail = (props: Props) => {
  const [eventId, setEventId] = useState<number | undefined>();

  useEffect(() => {
    props.route.params.eventId && setEventId(props.route.params.eventId);
  }, []);

  const { data, refetch, loading } = useQuery(GET_EVENTS_BY_USER_ID, {
    variables: { filters: { id: { eq: eventId } }, sort: ['publishedAt:desc'] },
  });
  const event = data?.events.data[0].attributes;

  return (
    <View>
      {data && <EventCard isFullScreen eventId={props.route.params.eventId} item={event}></EventCard>}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default EventDetail;
