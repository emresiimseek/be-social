import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import EventList from '../../components/common/EventList';
import { Props } from '../../types/common/props';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { Variables, Data } from '../../types/strapi/base/base';
import { USERS_QUERY } from '../../logic/graphql/queries/getUser';
import { View, ScrollView, RefreshControl } from 'react-native';

export const HomePage = (props: Props) => {
  const { loading, error, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: 3 },
  });

  const [user, setUser] = useState<UsersPermissionsUser | null>(null);

  useEffect(() => {
    setUser(data ? data : null);
  }, [data]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={async () => {
            const result = await refetch();
            setUser(result.data);
          }}
        />
      }
    >
      {user && <EventList navigation={props.navigation} user={user} isMine />}
    </ScrollView>
  );
};
