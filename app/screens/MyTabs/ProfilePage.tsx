import { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import ProfileHeaderComponent from '../../components/profile/ProfileHeader';
import { Props } from '../../types/common/props';
import EventList from '../../components/common/EventList';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../logic/graphql/queries/getUser';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { Variables } from '../../types/strapi/base/base';

export const ProfilePage = (props: Props) => {
  useEffect(() => {
    console.log(props.route?.params?.userId);

    if (props.route?.params?.userId) refetch({ id: props.route?.params?.userId });
  }, [props.route?.params?.userId]);

  const { loading, error, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: 3 },
  });

  return data ? (
    <ScrollView refreshControl={<RefreshControl refreshing={false} />}>
      <View>
        <ProfileHeaderComponent user={data} navigation={props.navigation} />
        <EventList user={data} isMine navigation={props.navigation} />
      </View>
    </ScrollView>
  ) : null;
};
