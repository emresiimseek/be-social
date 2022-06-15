import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { USERS_QUERY } from '../logic/graphql/queries/getUser';
import { Props } from '../types/common/props';
import { Variables } from '../types/strapi/base/base';
import { UsersPermissionsUser } from '../types/strapi/models/user-events';
import { RefreshControl, ScrollView, View } from 'react-native';
import { ProfileHeaderComponent } from '../components/profile/ProfileHeader';
import EventList from '../components/common/EventList';

export const VisitedProfile = (props: Props) => {
  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    setUserId(props.route.params.userId);
  });

  const { loading, error, data, refetch } = useQuery<UsersPermissionsUser, Variables>(USERS_QUERY, {
    variables: { id: userId },
  });

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={false} />}>
      {data && (
        <View>
          <ProfileHeaderComponent
            followed={() => {
              refetch();
            }}
            isMe={false}
            user={data}
            navigation={props.navigation}
          />
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
