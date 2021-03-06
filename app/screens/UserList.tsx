//import liraries
import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Variables } from '../types/strapi/base/base';
import { Props } from '../types/common/props';
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/themed';
import { UsersPermissionsUser } from '../types/strapi/models/user-events';
import { USERS_QUERY } from '../logic/graphql/queries/getUser';
import colors from '../styles/colors';
import { navigate } from '../RootNavigation';

// create a component
class UserList extends Component<Props> {
  render() {
    return (
      <Query<UsersPermissionsUser, Variables>
        query={USERS_QUERY}
        variables={{ id: this.props.route.params.userId }}
      >
        {({ data, loading }) => {
          return (
            <ScrollView>
              {this.props.route.params.follow
                ? data?.usersPermissionsUser.data.attributes.users_follow.data.map(user => (
                    <ListItem
                      key={user.id}
                      bottomDivider
                      onPress={() =>
                        navigate('VisitedProfile', {
                          userId: user.id,
                        })
                      }
                    >
                      <Avatar
                        source={{
                          uri:
                            user?.attributes?.profile_photo?.data?.attributes?.url ??
                            'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
                        }}
                        rounded
                        size={40}
                      />
                      <ListItem.Content>
                        <ListItem.Title>
                          {user.attributes.firstname + ' ' + user.attributes.lastname}
                        </ListItem.Title>
                        <ListItem.Subtitle>@{user.attributes.username}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  ))
                : data?.usersPermissionsUser.data.attributes.users_follow_me.data.map(user => (
                    <ListItem
                      key={user.id}
                      bottomDivider
                      onPress={() =>
                        navigate('VisitedProfile', {
                          userId: user.id,
                        })
                      }
                    >
                      <Avatar
                        source={{
                          uri:
                            user?.attributes?.profile_photo?.data?.attributes?.url ??
                            'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
                        }}
                        rounded
                        size={40}
                      />
                      <ListItem.Content>
                        <ListItem.Title>
                          {user.attributes.firstname + ' ' + user.attributes.lastname}
                        </ListItem.Title>
                        <ListItem.Subtitle>@{user.attributes.username}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  ))}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

// define your stylesr
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.thirdColor,
  },
});

//make this component available to the app
export default UserList;
