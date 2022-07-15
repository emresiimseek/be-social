//import liraries
import React, { Component, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { io } from 'socket.io-client';
import { getItem } from '../logic/helpers/useAsyncStorage';
import { useEffect } from 'react';
import { Props } from '../types/common/props';
import { navigate, navigationRef } from '../RootNavigation';
import { NotificationType } from '../types/common/notification-type';
import { Subscription } from 'expo-modules-core';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Notification } from '../types/strapi/models/notification';
import { Data, Item } from '../types/strapi/base/base';

// create a component
const AppNotifications = (props: Props) => {
  const [token, setToken] = useState<string>();
  const [currentUserId, setCurrentUserId] = useState<string>();

  const getToken = async () => {
    const token = await getItem<string>('token');
    const currentUserId = await getItem<string>('userId');
    setCurrentUserId(currentUserId);
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const SERVER_URL = 'https://quiet-retreat-10533.herokuapp.com';
  const socket = io(SERVER_URL, {
    auth: {
      token,
    },
  });

  const getMessageByType = (type: NotificationType, data: Item<Notification>) => {
    switch (type) {
      case 'follow_user':
        return `${data.data.attributes.me.data.attributes.username} kullanıcısı sizi takip etti.`;
      case 'like_event':
        return `${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.event.data.attributes.title} etkinliğinizi beğendi.`;
      case 'comment_event':
        return `${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.event.data.attributes.title} etkinliğinizi yorum yaptı.`;
      case 'comment_post':
        return `${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.post.data.attributes.description} gönderinize yorum yaptı.`;
      case 'like_post':
        return `${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.post.data.attributes.description} gönderinize beğendi.`;
      default:
        return '';
    }
  };

  socket.on('connect', () => {
    console.log(socket.active, 'STATUS');
  });

  const listener = (item: Item<Notification>) => {
    console.log(item);
    console.log(currentUserId, 'currentUserId');

    if (!item.data.attributes.related_users.data.find(item => item.id === currentUserId)) return;

    schedulePushNotification(getMessageByType(item.data.attributes.type, item));
    socket.removeAllListeners();
  };

  socket.off('notification:create').on('notification:create', listener);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  async function schedulePushNotification(body: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Be Social',
        body: body,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<Subscription | undefined>();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    const data = Notifications.addNotificationReceivedListener((notification: any) => {
      setNotification(notification);
    });

    notificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {});

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  return <></>;
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default AppNotifications;
