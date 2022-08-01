import { Button, ListItem } from '@rneui/base';
import { Avatar } from '@rneui/themed';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getMessageByType } from '../../logic/helpers/getNotificationMessage';
import { navigate } from '../../RootNavigation';
import colors from '../../styles/colors';
import { Data, Variables } from '../../types/strapi/base/base';
import { Notification } from '../../types/strapi/models/notification';
import moment from 'moment';
import 'moment/locale/tr';
import { useMutation } from '@apollo/client';
import { UPDATE_EVENT_REQUEST } from '../../logic/graphql/mutations/updateEventRequest';
import { sendPushNotification } from '../../logic/helpers/registerPushNotification';
import { usePushNotification } from '../../logic/helpers/usePushNotification';
import { Dimensions } from 'react-native';

interface NotificationDetailProps {
  notification: Data<Notification>;
  currentUserId: number | undefined;
  onChange?: () => void;
}

const NotificationDetail = (props: NotificationDetailProps) => {
  moment.locale('tr');

  const status = props?.notification?.attributes?.event_request?.data?.attributes?.status;

  const isAccepted = status === 'accepted';
  const isRejected = status === 'rejected';

  const [updateEventRequest, { data, loading, error }] = useMutation<any, Variables>(UPDATE_EVENT_REQUEST);

  const handlePress = (notification: Notification) => {
    if (notification.type === 'follow_user') {
      navigate('VisitedProfile', { userId: notification.me.data.id });
    } else if (notification.type === 'like_event') {
      navigate('EventDetail', { eventId: notification?.event?.data.id });
    } else if (notification.type === 'like_post') {
      navigate('PostDetail', { postId: notification?.post?.data.id });
    } else if (notification.type === 'comment_event' || notification.type === 'comment-reply_event') {
      navigate({
        name: 'Comments',
        params: {
          eventId: notification?.event?.data.id,
          currentUserId: props.currentUserId,
          type: 'event',
          eventUserId: props.currentUserId,
        },
        merge: true,
      });
    } else if (notification.type === 'comment_post' || notification.type === 'comment-reply_post') {
      navigate({
        name: 'Comments',
        params: {
          postId: notification?.post?.data.id,
          currentUserId: props.currentUserId,
          type: 'post',
          postUserId: props.currentUserId,
        },
        merge: true,
      });
    }
  };

  const acceptRequest = async () => {
    await updateEventRequest({
      variables: {
        id: Number(props.notification.attributes.event_request?.data.id) ?? 0,
        data: {
          status: 'accepted',
        },
      },
    });

    await usePushNotification({
      me: props.currentUserId ?? 0,
      related_users: [+props.notification.attributes.me.data.id ?? 0],
      type: 'event_request_accepted',
      event: props.notification?.attributes?.event?.data.id ?? '0',
      event_request: props.notification.attributes?.event_request?.data.id ?? '0',
    });
  };

  const rejectRequest = async () => {
    await updateEventRequest({
      variables: {
        id: Number(props.notification.attributes.event_request?.data.id) ?? 0,
        data: {
          status: 'rejected',
        },
      },
    });

    await usePushNotification({
      me: props.currentUserId ?? 0,
      related_users: [+props.notification.attributes.me.data.id ?? 0],
      type: 'event_request_rejected',
      event: props.notification?.attributes?.event?.data.id ?? '0',
      event_request: props.notification.attributes?.event_request?.data.id ?? '0',
    });
  };

  return (
    <ListItem bottomDivider onPress={() => handlePress(props.notification.attributes)}>
      <Avatar
        size={40}
        source={{
          uri:
            props.notification.attributes.me.data.attributes?.profile_photo?.data?.attributes?.url ??
            'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Subtitle>{getMessageByType(props.notification.attributes)}</ListItem.Subtitle>
        {props.notification.attributes.type === 'request_to_join_event' && (
          <ListItem.Title style={{ minWidth: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: Dimensions.get('window').width * 0.8,
                paddingVertical: 10,
              }}
            >
              <Button
                title="Kabul"
                containerStyle={{ width: '45%' }}
                onPress={acceptRequest}
                loading={loading}
                type={isAccepted ? 'solid' : 'outline'}
                icon={{
                  name: 'check-circle',
                  type: 'feather',
                  size: 15,
                  color: isAccepted ? 'white' : colors.successColor,
                }}
                iconPosition="right"
                buttonStyle={{ borderColor: colors.successColor }}
                titleStyle={{
                  fontSize: 14,
                  color: isAccepted ? 'white' : colors.successColor,
                }}
                size="sm"
                color="success"
              ></Button>
              <Button
                onPress={rejectRequest}
                loading={loading}
                title="Reddet"
                type={isRejected ? 'solid' : 'outline'}
                containerStyle={{ width: '45%' }}
                icon={{
                  name: 'x-circle',
                  type: 'feather',
                  size: 15,
                  color: isRejected ? 'white' : colors.errorColor,
                }}
                iconPosition="right"
                buttonStyle={{ borderColor: colors.errorColor }}
                titleStyle={{
                  fontSize: 14,
                  color: isRejected ? 'white' : colors.errorColor,
                }}
                size="sm"
                color="error"
              ></Button>
            </View>
          </ListItem.Title>
        )}
      </ListItem.Content>
      <View style={{ position: 'absolute', right: 5, bottom: 1 }}>
        <Text style={{ fontSize: 10, color: colors.textGrayColor }}>
          {moment(props.notification.attributes.createdAt).format('LLL')}
        </Text>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({});

export default NotificationDetail;
