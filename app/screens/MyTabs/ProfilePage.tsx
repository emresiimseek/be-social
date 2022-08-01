import { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { ProfileHeaderComponent } from '../../components/profile/ProfileHeader';
import { Props } from '../../types/common/props';
import { EventList } from '../../components/common/EventList';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../logic/graphql/queries/getUser';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { Items, Variables } from '../../types/strapi/base/base';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { GET_EVENTS_BY_USER_ID } from '../../logic/graphql/queries/getEventsById';
import { Event, EventData } from '../../types/strapi/models/event';
import GridList from '../../components/common/GridList';

export const ProfilePage = (props: Props) => {
  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUserId();
      refetch();
      eventRefetch();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const { loading, error, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: userId },
  });

  const {
    loading: eventLoading,
    data: eventData,
    refetch: eventRefetch,
  } = useQuery<{ events: Items<Event> }, Variables>(GET_EVENTS_BY_USER_ID, {
    variables: { filters: { owners: { id: { eq: userId } } }, sort: ['publishedAt:desc'] },
  });

  const events = eventData?.events.data;

  const [viewType, setViewType] = useState<'list' | 'grid'>('grid');

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={loading || eventLoading} onRefresh={() => refetch()} />}
    >
      {data && (
        <View>
          <ProfileHeaderComponent
            isMe={true}
            user={data}
            currentUserId={userId}
            onWiewChange={type => setViewType(type)}
            view={viewType}
          />
          {viewType === 'list' && !!events?.length && (
            <EventList events={events} isMine currentUserId={userId} />
          )}

          {viewType === 'grid' && !!events?.length && <GridList items={events} />}
        </View>
      )}
    </ScrollView>
  );
};
