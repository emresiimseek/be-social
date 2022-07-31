import { useQuery } from '@apollo/client';
import { ListItem } from '@rneui/base';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { GET_USERS_ONLY } from '../../logic/graphql/queries/getUsers';
import { Items, Variables } from '../../types/strapi/base/base';
import { UserAttributes } from '../../types/strapi/models/user-events';
import { Avatar } from '@rneui/themed';
import colors from '../../styles/colors';
import { useEffect } from 'react';
import { navigate } from '../../RootNavigation';

interface UserSearchProps {
  term: string;
}
// create a component
const UserSearch = (props: UserSearchProps) => {
  const { data, refetch, error, loading } = useQuery<
    { usersPermissionsUsers: Items<UserAttributes> },
    Variables
  >(GET_USERS_ONLY, {
    variables: {
      filters: {
        or: [
          { username: { contains: props.term } },
          { lastname: { contains: props.term } },
          { firstname: { contains: props.term } },
        ],
      },
    },
  });

  const isVisible = data && data?.usersPermissionsUsers.data.length > 0;
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={async () => refetch()} />}>
      <View style={{ flex: 1 }}>
        {isVisible
          ? data?.usersPermissionsUsers.data.map((user, index) => (
              <ListItem
                onPress={() =>
                  navigate('VisitedProfile', {
                    userId: user.id,
                  })
                }
                bottomDivider
                key={index}
              >
                <Avatar
                  source={{
                    uri:
                      user?.attributes?.profile_photo?.data?.attributes?.url ??
                      'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
                  }}
                  rounded
                  size={40}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    {user.attributes.firstname + ' ' + user.attributes.lastname}
                  </ListItem.Title>
                  <ListItem.Subtitle>@{user.attributes.username}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          : !loading && (
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.textGrayColor,
                  padding: 10,
                  fontSize: 12,
                }}
              >
                Sonuç bulunmadı
              </Text>
            )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default UserSearch;
