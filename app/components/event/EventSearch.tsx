import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { SEARCH_EVENT_RESULT } from '../../logic/graphql/queries/searchEventResult';
import { EventData } from '../../types/strapi/models/event';
import { Variables } from '../../types/strapi/base/base';
import colors from '../../styles/colors';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import EventGridList from '../EventGridList';

interface EventSearchProps {
  term: string;
}

const EventSearch = (props: EventSearchProps) => {
  const {
    data: eventData,
    loading: eventLoading,
    refetch: eventRefect,
  } = useQuery<EventData, Variables>(SEARCH_EVENT_RESULT, {
    variables: {
      filters: {
        or: [{ title: { contains: props.term } }, { description: { contains: props.term } }],
      },
    },
  });

  const events = eventData?.events;
  const isVisible = events && events.data.length > 0;

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={eventLoading} onRefresh={async () => eventRefect()} />}
    >
      <View style={{ flex: 1 }}>
        {isVisible ? (
          <EventGridList items={events?.data} />
        ) : (
          !eventLoading && (
            <Text style={{ textAlign: 'center', color: colors.textGrayColor, padding: 10, fontSize: 12 }}>
              Sonuç bulunmadı
            </Text>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default EventSearch;
