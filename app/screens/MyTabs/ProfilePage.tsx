import { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { ProfileHeaderComponent } from '../../components/profile/ProfileHeader';
import { Props } from '../../types/common/props';
import { EventList } from '../../components/common/EventList';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../logic/graphql/queries/getUser';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { Variables } from '../../types/strapi/base/base';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { GET_EVENTS_BY_USER_ID } from '../../logic/graphql/queries/getEventsById';
import { EventData } from '../../types/strapi/models/event';

export const ProfilePage = (props: Props) => {
  const [userId, setUserId] = useState<number | undefined>();

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
    error: eventError,
    data: eventData,
    refetch: eventRefetch,
  } = useQuery<any, Variables>(GET_EVENTS_BY_USER_ID, {
    variables: { filters: { owners: { id: { eq: userId } } }, sort: ['publishedAt:desc'] },
  });

  const event = eventData?.events.data;

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => refetch()} />}>
      {data && (
        <View>
          <ProfileHeaderComponent
            isMe={true}
            user={data}
            navigation={props.navigation}
            currentUserId={userId}
          />
          {event?.length > 0 && (
            <EventList event={event} isMine currentUserId={userId} navigation={props.navigation} />
          )}
        </View>
      )}
    </ScrollView>
  );
};
