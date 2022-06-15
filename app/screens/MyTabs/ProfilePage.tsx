import { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import ProfileHeaderComponent from '../../components/profile/ProfileHeader';
import { Props } from '../../types/common/props';
import EventList from '../../components/common/EventList';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../logic/graphql/queries/getUser';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { Variables } from '../../types/strapi/base/base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfilePage = (props: Props) => {
  const [userId, setUserId] = useState<number | undefined>();
  useEffect(() => {
    const getUserId = async () => {
      const userId = (await AsyncStorage.getItem('userId')) ?? 0;
      setUserId(+userId);
    };

    getUserId();
  }, []);

  const { loading, error, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: userId },
  });

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={false} />}>
      {data && (
        <View>
          <ProfileHeaderComponent isMe={true} user={data} navigation={props.navigation} />
          <EventList
            event={{
              getEventsByUserId: { data: [...data.usersPermissionsUser.data.attributes.events.data] },
            }}
            isMine
            navigation={props.navigation}
          />
        </View>
      )}
    </ScrollView>
  );
};
