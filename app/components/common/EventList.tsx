import { View, Text } from 'react-native';
import { EventCard } from './EventCard';
import { Props } from '../../types/common/props';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import { useState, useEffect } from 'react';

export interface EventProps extends Props {
  isMine: boolean;
  event: FlowEventData;
}

export const EventList = (props: EventProps) => {
  const [userId, setUserId] = useState<number | undefined | null>();

  useEffect(() => {
    const setId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setUserId(userId ? +userId : null);
    };
    setId();
  }, []);

  return (
    <View>
      {props.event.getEventsByUserId.data.length ? (
        props.event.getEventsByUserId.data.map(event => (
          <EventCard
            key={event.id}
            item={event.attributes}
            eventId={event.id}
            currentUserId={userId}
            navigation={props.navigation}
          />
        ))
      ) : (
        <Text></Text>
      )}
    </View>
  );
};
