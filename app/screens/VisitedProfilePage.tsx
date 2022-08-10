import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { EventList } from '../components/event/EventList';
import { ProfileHeaderComponent } from '../components/user/ProfileHeader';
import { GET_EVENTS_BY_USER_ID } from '../logic/graphql/queries/getEventsById';
import { USERS_QUERY } from '../logic/graphql/queries/getUser';
import { Props } from '../types/common/props';
import { Variables } from '../types/strapi/base/base';
import { UsersPermissionsUser } from '../types/strapi/models/user-events';
import EventGridList from '../components/EventGridList';

export const VisitedProfile = (props: Props) => {
  const [visitedUserId, setVisitedUserId] = useState<number | undefined>();
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();

  useEffect(() => {
    const currentUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      setCurrentUserId(+userId);
    };

    currentUserId();
    setVisitedUserId(props.route.params.userId);
  });

  const { loading, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: visitedUserId },
  });

  const { data: eventData, refetch: eventRefetch } = useQuery<any, Variables>(GET_EVENTS_BY_USER_ID, {
    variables: { filters: { owners: { id: { eq: visitedUserId } } }, sort: ['publishedAt:desc'] },
  });

  const event = eventData?.events.data;
  const [viewType, setViewType] = useState<'list' | 'grid'>('grid');

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => refetch()} />}>
      {data && (
        <View>
          <ProfileHeaderComponent
            isMe={false}
            user={data}
            currentUserId={currentUserId}
            onWiewChange={type => setViewType(type)}
            view={viewType}
            loading={loading}
            refecth={() => refetch()}
          />
          {viewType === 'list' && event?.length > 0 && (
            <EventList events={event} isMine={false} currentUserId={currentUserId} />
          )}

          {viewType === 'grid' && event?.length > 0 && <EventGridList items={event} />}
        </View>
      )}
    </ScrollView>
  );
};
