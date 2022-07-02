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

interface ProfileHeaderProps extends Props {
  user: UsersPermissionsUser;
  isMe: boolean;
  currentUserId?: number;
  refect?: any;
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
      props.refect();
    }
  }, [mutationData]);

  return (
    <View>
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
            <Text style={styles.countText}>{user?.events.data.length} Etkinlik</Text>
            <Text
              onPress={() =>
                props.navigation.navigate({
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
                props.navigation.navigate({
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
                onPress={() => {
                  followUser({
                    variables: { userId: props.currentUserId, userIds: [+userId], follow: !followed },
                  });
                }}
                titleStyle={styles.buttonTitle}
                style={styles.button}
                size="sm"
                color="#334756"
              >
                {followed ? 'Takipten Çık' : 'Takip Et'}
                <Icon
                  name={followed ? 'person-remove' : 'person-add'}
                  type="metarial"
                  size={12}
                  style={{ marginHorizontal: 5 }}
                  color="#FF4C29"
                />
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 150,
    marginBottom: 10,
    borderRadius: 5,
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
