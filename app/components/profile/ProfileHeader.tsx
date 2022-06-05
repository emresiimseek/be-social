import { Icon, Image } from '@rneui/themed';
import { Card } from '@rneui/themed';

import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../../types/strapi/strapi-user';
import { Avatar } from '@rneui/themed';
import { Button } from '@rneui/base';

export interface ProfileHeaderProps {
  user: User | null;
}

export interface ProfileHeaderState {}

export default class ProfileHeaderComponent extends React.Component<ProfileHeaderProps, ProfileHeaderState> {
  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Avatar source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} rounded size={70} />
          <Text style={{ textTransform: 'capitalize', marginVertical: 5 }}>
            {this.props.user?.firstname} {this.props.user?.lastname}
          </Text>
          <Text> @{this.props.user?.username}</Text>
        </View>
        <View style={styles.count}>
          <Text style={styles.countText}>12 Gönderi</Text>
          <Text style={styles.countText}>12 Takip</Text>
          <Text style={styles.countText}>12 Takipçi</Text>
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
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
    minHeight: 150,
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
