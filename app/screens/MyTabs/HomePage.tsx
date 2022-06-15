import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import EventList from '../../components/common/EventList';
import { Props } from '../../types/common/props';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { Variables, Data } from '../../types/strapi/base/base';
import { USERS_QUERY } from '../../logic/graphql/queries/getUser';
import { View, ScrollView, RefreshControl } from 'react-native';
import { FLOW_EVENTS } from '../../logic/graphql/queries/getEventsByUserId';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomePage = (props: Props) => {
  const [userId, setUserId] = useState<number | undefined>();
  const [event, setEvent] = useState<FlowEventData | null>(null);

  const { loading, error, data, refetch } = useQuery<FlowEventData, Variables>(FLOW_EVENTS, {
    variables: { userId: userId },
  });

  useEffect(() => {
    const getUserId = async () => {
      const userId = (await AsyncStorage.getItem('userId')) ?? 0;
      setUserId(+userId);
    };
    getUserId();
  }, []);

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
