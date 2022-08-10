import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core/src/EventEmitter';
import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Notification } from '../types/strapi/models/notification';
import { getMessageByType } from '../logic/helpers/getNotificationMessage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface AppNotificationsProps {
  notification: Notification | undefined;
  userId: number | undefined;
}

export default function AppNotifications(props: AppNotificationsProps) {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<Subscription>({ remove: () => {} });
  const responseListener = useRef<Subscription>({ remove: () => {} });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (!props.notification) return;

    const user = props.notification.me.data.attributes;

    if (!props.notification.related_users.data.find(data => data.attributes.id === props.userId)) return;

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: `${user.firstname} ${user.lastname}`,
      body: getMessageByType(props.notification, props.userId),
      data: { someData: 'goes here' },
    };

    sendPushNotification(expoPushToken, message);
  }, [props.notification]);

  return <></>;
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string | undefined, message: any) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

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
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log('Must use physical device for Push Notifications');
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
