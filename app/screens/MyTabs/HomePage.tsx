import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { EventList } from '../../components/common/EventList';
import { Props } from '../../types/common/props';
import { Data, Variables } from '../../types/strapi/base/base';
import { ScrollView, RefreshControl, Alert } from 'react-native';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { FLOW_EVENTS } from '../../logic/graphql/queries/getFlowEventsByUserId';
import { Event } from '../../types/strapi/models/event';

export const HomePage = (props: Props) => {
  const [componentLoading, setComponentLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setComponentLoading(true);
      await getUserId();
      await refetch();
      setComponentLoading(false);
    });

    return unsubscribe;
  }, [props.navigation]);

  const [userId, setUserId] = useState<number | undefined>();

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    const token = await getItem<number>('token');

    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const [event, setEvent] = useState<Data<Event>[] | undefined>();

  const { loading, error, data, refetch } = useQuery<FlowEventData, Variables>(FLOW_EVENTS, {
    variables: { userId: userId },
  });

  useEffect(() => {
    setEvent(data?.getEventsByUserId.data);
  }, [data]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading || componentLoading}
          onRefresh={async () => {
            const result = await refetch();
            setEvent(result.data.getEventsByUserId.data);
          }}
        />
      }
    >
      {event && <EventList event={event} isMine onChange={() => refetch()} />}
    </ScrollView>
  );
};
