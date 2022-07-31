import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../../logic/graphql/queries/getNotifications';
import { Items, Variables } from '../../types/strapi/base/base';
import { useState } from 'react';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { Notification } from '../../types/strapi/models/notification';
import { colors } from '../../styles/colors';
import { ScrollView } from 'react-native';
import { Props } from '../../types/common/props';
import { Icon } from '@rneui/themed';
import NotificationDetail from '../../components/common/NotificationDetail';

// create a component
const Notifications = (props: Props) => {
  const [componentLoading, setComponentLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setComponentLoading(true);
      await getUserId();
      await refetch();
      setComponentLoading(false);
    });

    return unsubscribe;
  }, [props.navigation]);

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
    { variables: { filters: { related_users: { id: { eq: userId } } }, sort: ['publishedAt:desc'] } }
  );

  console.table(loading);

  const notificationsCount = data?.notifications.data.length ?? 0;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading || componentLoading}
          onRefresh={async () => {
            const result = await refetch();
          }}
        />
      }
    >
      {notificationsCount > 0 ? (
        <View>
          {data?.notifications.data.map((l, i) => (
            <NotificationDetail key={i} notification={l} currentUserId={userId} onChange={() => refetch()} />
          ))}
        </View>
      ) : (
        !loading && (
          <View style={styles.container}>
            <Icon name="bell" type="octicon" size={30} color={colors.textGrayColor} />
            <Text style={{ textAlign: 'center', fontSize: 12, color: colors.textGrayColor, padding: 5 }}>
              Hiç bildiriminiz yok.
            </Text>
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
});

export default Notifications;
