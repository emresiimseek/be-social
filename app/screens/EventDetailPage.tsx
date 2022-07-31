import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventCard } from '../components/common/EventCard';
import { Props } from '../types/common/props';
import { useQuery } from '@apollo/client';
import { GET_EVENTS_BY_USER_ID } from '../logic/graphql/queries/getEventsById';
import { useState } from 'react';
import { useEffect } from 'react';
import EventCardHome from '../components/common/EventCardHome';
import { getItem } from '../logic/helpers/useAsyncStorage';

// create a component
const EventDetail = (props: Props) => {
  const [eventId, setEventId] = useState<number | undefined>();
  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    props.route.params.eventId && setEventId(props.route.params.eventId);
    getItem<string>('userId').then(userId => {
      if (!userId) return;

      setUserId(+userId);
    });
  }, []);

  const { data, refetch, loading } = useQuery(GET_EVENTS_BY_USER_ID, {
    variables: { filters: { id: { eq: eventId } }, sort: ['publishedAt:desc'] },
  });
  const event = data?.events.data[0].attributes;

  return <View>{data && <EventCardHome event={data?.events.data[0]} currentUserId={userId} />}</View>;
};

const styles = StyleSheet.create({});

export default EventDetail;
