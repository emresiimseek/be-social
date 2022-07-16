import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { EventList } from '../components/common/EventList';
import GridList from '../components/common/GridList';
import { ProfileHeaderComponent } from '../components/profile/ProfileHeader';
import { GET_EVENTS_BY_USER_ID } from '../logic/graphql/queries/getEventsById';
import { USERS_QUERY } from '../logic/graphql/queries/getUser';
import { Props } from '../types/common/props';
import { Variables } from '../types/strapi/base/base';
import { UsersPermissionsUser } from '../types/strapi/models/user-events';

export const VisitedProfile = (props: Props) => {
  const [visitedUserId, setVisitedUserId] = useState<number | undefined>();
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();

  useEffect(() => {
    const currentUserId = async () => {
      const userId = (await AsyncStorage.getItem('userId')) ?? 0;
      setCurrentUserId(+userId);
    };

    currentUserId();
    setVisitedUserId(props.route.params.userId);
  });

  const { loading, error, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: visitedUserId },
  });

  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
    refetch: eventRefetch,
  } = useQuery<any, Variables>(GET_EVENTS_BY_USER_ID, {
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
            navigation={props.navigation}
            currentUserId={currentUserId}
            onWiewChange={type => setViewType(type)}
            view={viewType}
          />
          {viewType === 'list' && event?.length > 0 && (
            <EventList
              event={event}
              isMine={false}
              currentUserId={currentUserId}
              navigation={props.navigation}
            />
          )}

          {viewType === 'grid' && event?.length > 0 && (
            <GridList items={event} navigation={props.navigation} />
          )}
        </View>
      )}
    </ScrollView>
  );
};
