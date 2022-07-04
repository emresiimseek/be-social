import { View, Text } from 'react-native';
import { EventCard } from './EventCard';
import { Props } from '../../types/common/props';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import { useState, useEffect } from 'react';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { colors } from '../../styles/colors';

export interface EventProps extends Props {
  isMine: boolean;
  event: FlowEventData;
}

export const EventList = (props: EventProps) => {
  const [userId, setUserId] = useState<number | undefined>();

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <>
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
    </>
  );
};
