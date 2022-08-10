import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Props } from '../types/common/props';
import { useQuery } from '@apollo/client';
import { GET_EVENTS_BY_USER_ID } from '../logic/graphql/queries/getEventsById';
import { useState } from 'react';
import { useEffect } from 'react';
import { getItem } from '../logic/helpers/useAsyncStorage';
import EventCardHome from '../components/event/EventCardHome';

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

  return (
    <View>{data && <EventCardHome event={data?.events.data[0]} currentUserId={userId} isCarousel />}</View>
  );
};

export default EventDetail;
