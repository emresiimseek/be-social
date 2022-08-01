import { Props } from '../../types/common/props';
import React, { useState, useEffect } from 'react';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';
import { Text } from '@rneui/base';
import { colors } from '../../styles/colors';
import EventCardHome from './EventCardHome';

export interface EventProps extends Props {
  isMine: boolean;
  events: Data<Event>[];
  onChange?: () => void;
  currentScrollPosition?: number;
}

export const EventList = (props: EventProps) => {
  const [userId, setUserId] = useState<number | undefined>();
  const isVisible = props.events.length > 0;

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <>
      {isVisible ? (
        props.events.map((event, index) => (
          <EventCardHome
            isCarousel
            key={index}
            event={event}
            currentUserId={userId}
            currentScrollPosition={props.currentScrollPosition}
          />
        ))
      ) : (
        <Text style={{ color: colors.textGrayColor, textAlign: 'center', padding: 10 }}>Etkinlik yok</Text>
      )}
    </>
  );
};
