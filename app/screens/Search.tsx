//import liraries
import { SearchBar } from '@rneui/themed';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USERS_ONLY } from '../logic/graphql/queries/getUsers';
import { UserAttributes } from '../types/strapi/models/user-events';
import { Items, Variables } from '../types/strapi/base/base';
import { Avatar, ButtonGroup, Icon, ListItem, Tab } from '@rneui/base';
import { useEffect } from 'react';
import { colors } from '../styles/colors';
import { TabView, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';

// create a component
const Search = () => {
  const [term, setTerm] = useState('');

  useEffect(() => {
    refetch();
  }, [term]);

  const { data, refetch, error, loading } = useQuery<
    { usersPermissionsUsers: Items<UserAttributes> },
    Variables
  >(GET_USERS_ONLY, {
    variables: {
      filters: {
        or: [
          { username: { contains: term } },
          { lastname: { contains: term } },
          { firstname: { contains: term } },
        ],
      },
    },
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'first', title: 'Kullanıcılar', icon: 'users' },
    { key: 'second', title: 'Etkinlikler', icon: 'calendar' },
    { key: 'third', title: 'Gönderiler', icon: 'albums-outline', iconName: 'ionicon' },
  ]);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
      <View style={{ width: '100%', minHeight: '100%', backgroundColor: 'white' }}>
        {data &&
          data?.usersPermissionsUsers.data.map((user, index) => (
            <ListItem bottomDivider key={index}>
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
                <ListItem.Title>{user.attributes.firstname + ' ' + user.attributes.lastname}</ListItem.Title>
                <ListItem.Subtitle>@{user.attributes.username}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        <Text
          style={{
            textAlign: 'center',
            padding: 10,
            fontSize: 10,
            color: colors.secondColor,
            fontWeight: 'bold',
          }}
        >
          Tüm sonuçlar için tıklayınız
        </Text>
      </View>
    </View>
  );

  const SecondRoute = () => <View style={{ flex: 1 }} />;
  const ThirdRoute = () => <View style={{ flex: 1 }} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
        icon: string;
        iconName?: string;
      }>;
    }
  ) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) => (inputIndex === i ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.tabItem,
                i == index && { borderBottomWidth: 1, borderBottomColor: colors.secondColor },
              ]}
              onPress={() => setIndex(i)}
            >
              <Animated.Text
                style={{
                  opacity,
                  fontSize: 12,
                }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}
                >
                  <Icon name={route.icon} type={route.iconName ? route.iconName : 'feather'} size={15} />
                  <Text style={{ paddingLeft: 5 }}>{route.title}</Text>
                </View>
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={text => setTerm(text)}
        platform={Platform.OS == 'ios' ? 'ios' : 'android'}
        value={term}
        showLoading={loading}
        showCancel={false}
        cancelButtonTitle=""
      />
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  activeTab: { backgroundColor: colors.secondColor, color: 'red' },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

//make this component available to the app
export default Search;
