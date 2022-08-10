import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Props } from '../../types/common/props';
import { Data, Variables } from '../../types/strapi/base/base';
import { ScrollView, RefreshControl, Alert } from 'react-native';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { FLOW_EVENTS } from '../../logic/graphql/queries/getFlowEventsByUserId';
import { Event } from '../../types/strapi/models/event';
import { navigate } from '../../RootNavigation';
import { EventList } from '../../components/event/EventList';

export const HomePage = (props: Props) => {
  const [componentLoading, setComponentLoading] = useState(false);
  const [position, setPosition] = useState(0);

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

  const [events, setEvent] = useState<Data<Event>[] | undefined>();
  const { loading, data, refetch } = useQuery<FlowEventData, Variables>(FLOW_EVENTS, {
    variables: { userId: userId },
  });

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    if (!userId) navigate('Welcome');

    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    setEvent(data?.getEventsByUserId.data);
  }, [data]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEventThrottle={16}
      onScroll={e => {
        setPosition(e.nativeEvent.contentOffset.y);
      }}
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
      {events && (
        <EventList events={events} isMine onChange={() => refetch()} currentScrollPosition={position} />
      )}
    </ScrollView>
  );
};
