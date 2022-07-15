//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../logic/graphql/queries/getNotifications';
import { Items, Variables } from '../types/strapi/base/base';
import { useState } from 'react';
import { getItem } from '../logic/helpers/useAsyncStorage';
import { Avatar, ListItem } from '@rneui/base';
import { Notification } from '../types/strapi/models/notification';
import { getMessageByType } from '../logic/helpers/getNotificationMessage';
import moment from 'moment';
import 'moment/locale/tr';
import { colors } from '../styles/colors';
import { ScrollView } from 'react-native';

// create a component
const Notofications = () => {
  moment.locale('tr');

  const [userId, setUserId] = useState<number | undefined>();

  const getUserId = async () => {
    const userId = await getItem<number>('userId');

    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const { loading, error, data, refetch } = useQuery<{ notifications: Items<Notification> }, Variables>(
    GET_NOTIFICATIONS,
    { variables: { filters: { related_users: { id: { eq: userId } } } } }
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={async () => {
            const result = await refetch();
          }}
        />
      }
    >
      {data && (
        <View>
          {data?.notifications.data.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                containerStyle={{ marginBottom: 'auto' }}
                source={{
                  uri:
                    l.attributes.me.data.attributes?.profile_photo?.data?.attributes?.url ??
                    'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
                }}
              />
              <ListItem.Content>
                <ListItem.Subtitle>{getMessageByType(l.attributes.type, { data: l })}</ListItem.Subtitle>
                <View style={{ position: 'absolute', right: 0, bottom: -15 }}>
                  <Text style={{ fontSize: 10, color: colors.thirdColor }}>
                    {moment(l.attributes.createdAt).format('LLL')}
                  </Text>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default Notofications;
