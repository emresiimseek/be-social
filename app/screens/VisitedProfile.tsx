import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { USERS_QUERY } from '../logic/graphql/queries/getUser';
import { Props } from '../types/common/props';
import { Variables } from '../types/strapi/base/base';
import { UsersPermissionsUser } from '../types/strapi/models/user-events';
import { RefreshControl, ScrollView, View } from 'react-native';
import { ProfileHeaderComponent } from '../components/profile/ProfileHeader';
import { EventList } from '../components/common/EventList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VisitedProfile = (props: Props) => {
  const [userId, setUserId] = useState<number | undefined>();
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();

  useEffect(() => {
    const currentUserId = async () => {
      const userId = (await AsyncStorage.getItem('userId')) ?? 0;
      setCurrentUserId(+userId);
    };

    currentUserId();
    setUserId(props.route.params.userId);
  });

  const { loading, error, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: userId },
  });

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => refetch()} />}>
      {data && (
        <View>
          <ProfileHeaderComponent
            refect={() => refetch()}
            currentUserId={currentUserId}
            isMe={false}
            user={data}
            navigation={props.navigation}
          />
          <EventList
            event={{
              ...data.usersPermissionsUser.data.attributes.owner_events.data,
            }}
            isMine
            navigation={props.navigation}
          />
        </View>
      )}
    </ScrollView>
  );
};
