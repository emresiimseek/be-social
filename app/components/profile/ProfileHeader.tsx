import { Icon, Image } from '@rneui/themed';
import { Card } from '@rneui/themed';
import * as React from 'react';
import { View, StyleSheet, Text, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '@rneui/themed';
import { Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Props } from '../../types/common/props';
import { User } from '../../types/strapi/models/user';
import { Items, Variables } from '../../types/strapi/base/base';
import { UserEvents, UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { USERS_QUERY } from '../../graphql/queries/getUser';

export default class ProfileHeaderComponent extends React.Component<Props> {
  userId = () => AsyncStorage.getItem('userId');

  state = { userId: null };

  componentDidMount = async () => {
    const userId = await this.userId();
    this.setState({ userId: userId });
  };

  public render() {
    return (
      <Query<UsersPermissionsUser, Variables>
        query={USERS_QUERY}
        variables={{ id: this.state.userId ? this.state.userId : 0 }}
      >
        {({ loading, data }) => {
          const user = data?.usersPermissionsUser?.data?.attributes;
          return (
            <ScrollView refreshControl={<RefreshControl refreshing={loading} />}>
              {data?.usersPermissionsUser.data && (
                <View style={styles.container}>
                  <View style={styles.info}>
                    <Avatar
                      source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
                      rounded
                      size={70}
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
                        this.props.navigation.navigate({
                          name: 'Follow',
                          params: { userId: this.state.userId, follow: true },
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
                          params: { userId: this.state.userId },
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
                      <Icon
                        name="send"
                        type="metarial"
                        size={12}
                        style={{ marginHorizontal: 5 }}
                        color="#FF4C29"
                      />
                    </Button>
                  </View>
                </View>
              )}
            </ScrollView>
          );
        }}
      </Query>
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
