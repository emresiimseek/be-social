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
import { Props } from '../types/common/props';
import { Icon } from '@rneui/themed';

// create a component
const Notofications = (props: Props) => {
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

  const handlePress = (notification: Notification) => {
    if (notification.type === 'follow_user') {
      props.navigation.navigate('VisitedProfile', { userId: notification.me.data.id });
    } else if (notification.type === 'like_event') {
      props.navigation.navigate('EventDetail', { eventId: notification?.event?.data.id });
    } else if (notification.type === 'like_post') {
      props.navigation.navigate('PostDetail', { postId: notification?.post?.data.id });
    } else if (notification.type === 'comment_event' || notification.type === 'comment-reply_event') {
      props.navigation.navigate({
        name: 'Comments',
        params: {
          eventId: notification?.event?.data.id,
          currentUserId: userId,
          type: 'event',
          eventUserId: userId,
        },
        merge: true,
      });
    } else if (notification.type === 'comment_post' || notification.type === 'comment-reply_post') {
      props.navigation.navigate({
        name: 'Comments',
        params: {
          postId: notification?.post?.data.id,
          currentUserId: userId,
          type: 'post',
          postUserId: userId,
        },
        merge: true,
      });
    }
  };

  const notificationsCount = data?.notifications.data.length ?? 0;

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
      {notificationsCount > 0 ? (
        <View>
          {data?.notifications.data.map((l, i) => (
            <ListItem key={i} bottomDivider onPress={() => handlePress(l.attributes)}>
              <Avatar
                containerStyle={{ marginBottom: 'auto' }}
                source={{
                  uri:
                    l.attributes.me.data.attributes?.profile_photo?.data?.attributes?.url ??
                    'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
                }}
              />
              <ListItem.Content>
                <ListItem.Subtitle>{getMessageByType(l.attributes)}</ListItem.Subtitle>
                <View style={{ position: 'absolute', right: 0, bottom: -15 }}>
                  <Text style={{ fontSize: 10, color: colors.textGrayColor }}>
                    {moment(l.attributes.createdAt).format('LLL')}
                  </Text>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      ) : (
        <View style={styles.container}>
          <Icon name="notifications" size={50} color={colors.textGrayColor} />
          <Text style={{ textAlign: 'center', fontSize: 12, color: colors.textGrayColor, padding: 5 }}>
            Hiç bildiriminiz yok.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
});

//make this component available to the app
export default Notofications;
