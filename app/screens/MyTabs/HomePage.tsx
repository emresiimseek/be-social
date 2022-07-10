import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { EventList } from '../../components/common/EventList';
import { Props } from '../../types/common/props';
import { Variables } from '../../types/strapi/base/base';
import { ScrollView, RefreshControl } from 'react-native';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { FLOW_EVENTS } from '../../logic/graphql/queries/getFlowEventsByUserId';

export const HomePage = (props: Props) => {
  const [userId, setUserId] = useState<number | undefined>();

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const [event, setEvent] = useState<FlowEventData | null>(null);

  const { loading, error, data, refetch } = useQuery<FlowEventData, Variables>(FLOW_EVENTS, {
    variables: { userId: userId },
  });

  useEffect(() => {
    setEvent(data ? data : null);
  }, [data]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={async () => {
            const result = await refetch();
            setEvent(result.data);
          }}
        />
      }
    >
      {event && <EventList navigation={props.navigation} event={event} isMine />}
    </ScrollView>
  );
};
