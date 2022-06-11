import { Icon } from '@rneui/themed';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Button } from '@rneui/base';
import { Props } from '../../types/common/props';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';

interface ProfileHeaderProps extends Props {
  user: UsersPermissionsUser;
}
export default class ProfileHeaderComponent extends React.Component<ProfileHeaderProps> {
  public render() {
    const user = this.props.user.usersPermissionsUser.data.attributes;
    const userId = this.props.user.usersPermissionsUser.data.id;
    return (
      <View>
        {user && (
          <View style={styles.container}>
            <View style={styles.info}>
              <Avatar source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} rounded size={70} />
              <Text style={{ textTransform: 'capitalize', marginVertical: 5 }}>
                {user?.firstname} {user?.lastname}
              </Text>
              <Text> @{user?.username}</Text>
            </View>
            <View style={styles.count}>
              <Text style={styles.countText}>{user?.events.data.length} Etkinlik</Text>
              <Text
                onPress={() =>
                  this.props.navigation.navigate({
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
                  this.props.navigation.navigate({
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
            <View style={styles.bottom}>
              <Button titleStyle={styles.buttonTitle} style={styles.button} size="sm" color="#334756">
                Takip
                <Icon
                  name="person-add"
                  type="metarial"
                  size={12}
                  style={{ marginHorizontal: 5 }}
                  color="#FF4C29"
                />
              </Button>
              <Button titleStyle={styles.buttonTitle} style={styles.button} size="sm" color="#334756">
                Mesaj
                <Icon name="send" type="metarial" size={12} style={{ marginHorizontal: 5 }} color="#FF4C29" />
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    minHeight: 150,
    marginVertical: 10,
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
