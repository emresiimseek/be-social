import { EventCard } from './EventCard';
import { Props } from '../../types/common/props';
import { useState, useEffect } from 'react';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';

export interface EventProps extends Props {
  isMine: boolean;
  event: Data<Event>[];
  onChange?: () => void;
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
      {props.event.length > 0 &&
        props.event.map(event => (
          <EventCard
            key={event.id}
            item={event.attributes}
            eventId={event.id}
            currentUserId={userId}
            onChange={props.onChange}
          />
        ))}
    </>
  );
};
