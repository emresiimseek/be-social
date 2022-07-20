import { Icon } from '@rneui/themed';
import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Button } from '@rneui/base';
import { Props } from '../../types/common/props';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER, UPDATE_USER } from '../../logic/graphql/mutations/followUser';
import { Variables } from '../../types/strapi/base/base';
import { usePushNotification } from '../../logic/helpers/usePushNotification';
import colors from '../../styles/colors';
import { navigate } from '../../RootNavigation';

interface ProfileHeaderProps extends Props {
  user: UsersPermissionsUser;
  isMe: boolean;
  currentUserId?: number;
  refecth?: any;
  onWiewChange: (view: 'grid' | 'list') => void;
  view: 'grid' | 'list';
  loading?: boolean;
}

export const ProfileHeaderComponent = (props: ProfileHeaderProps) => {
  const user = props.user.usersPermissionsUser.data.attributes;
  const userId = props.user.usersPermissionsUser.data.id;
  const followed = user?.users_follow_me.data.find(item => +item.id === props.currentUserId);
  const [followUser, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation<
    any,
    Variables
  >(FOLLOW_USER);

  useEffect(() => {
    if (mutationData) {
      props.refecth();
    }
  }, [mutationData]);

  const follow = async () => {
    const result = await followUser({
      variables: { userId: props.currentUserId, userIds: [+userId], follow: !followed },
    });
    if (result.data && !followed) {
      usePushNotification({ me: props.currentUserId ?? 0, related_users: [+userId], type: 'follow_user' });
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {user && (
        <View style={styles.container}>
          <View style={styles.info}>
            <Avatar
              source={{
                uri: user?.profile_photo?.data?.attributes?.url
                  ? user?.profile_photo?.data?.attributes?.url
                  : 'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
              }}
              rounded
              size={65}
            />
            <Text style={{ textTransform: 'capitalize', marginVertical: 5 }}>
              {user?.firstname} {user?.lastname}
            </Text>
            <Text> @{user?.username}</Text>
          </View>
          <View style={styles.count}>
            <Text style={styles.countText}>{user?.owner_events.data.length} Etkinlik</Text>
            <Text
              onPress={() =>
                navigate({
                  name: 'Follow',
                  params: { userId, follow: true },
                  merge: true,
                })
              }
              style={styles.countText}
            >
              {user?.users_follow.data.length} Takip
            </Text>
            <Text
              onPress={() =>
                navigate({
                  name: 'Follow',
                  params: { userId },
                  merge: true,
                })
              }
              style={styles.countText}
            >
              {user?.users_follow_me.data.length} Takipçi
            </Text>
          </View>
          {props.currentUserId !== +props.user.usersPermissionsUser.data.id && (
            <View style={styles.bottom}>
              <Button
                onPress={() => follow()}
                titleStyle={{ color: colors.secondColor, fontSize: 12 }}
                style={styles.button}
                loading={props.loading || mutationLoading}
                type="outline"
                buttonStyle={{
                  borderColor: colors.secondColor,
                }}
                loadingProps={{
                  size: 'small',
                  color: colors.secondColor,
                }}
                size="sm"
              >
                {followed ? 'Takipten Çık' : 'Takip Et'}
                <Icon
                  name={followed ? 'user-minus' : 'user-plus'}
                  type="feather"
                  size={12}
                  style={{ marginHorizontal: 5 }}
                  color={colors.secondColor}
                />
              </Button>
            </View>
          )}
        </View>
      )}
      <View style={{ position: 'absolute', zIndex: 10, right: 0, bottom: 0 }}>
        <Button
          icon={{
            type: 'ionicon',
            name: props.view === 'grid' ? 'list' : 'ios-grid',
            size: props.view === 'grid' ? 22 : 20,
            color: colors.secondColor,
          }}
          size="sm"
          color="transparent"
          onPress={() => props.onWiewChange(props.view === 'grid' ? 'list' : 'grid')}
        ></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  info: {
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
    minWidth: '30%',
  },
  buttonTitle: {
    fontSize: 12,
  },
  count: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
  },
  countText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
});
