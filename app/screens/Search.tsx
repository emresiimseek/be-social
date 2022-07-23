//import liraries
import { SearchBar } from '@rneui/themed';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useEffect } from 'react';
import { colors } from '../styles/colors';
import { TabView, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';
import UserSearch from '../components/common/UserSearch';
import EventSearch from '../components/common/EventSearch';
import PostSearch from '../components/common/PostSearch';
import { Icon } from '@rneui/themed';

// create a component
const Search = () => {
  const [term, setTerm] = useState('');

  useEffect(() => {}, [term]);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'first', title: 'Kullanıcılar', icon: 'users' },
    { key: 'second', title: 'Etkinlikler', icon: 'calendar' },
    { key: 'third', title: 'Gönderiler', icon: 'albums-outline', iconName: 'ionicon' },
  ]);

  const FirstRoute = () => <UserSearch term={term} />;
  const SecondRoute = () => <EventSearch term={term} />;
  const ThirdRoute = () => <PostSearch term={term} />;

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
                i == index && {
                  borderBottomWidth: 2,
                  borderBottomColor: colors.secondColor,
                },
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
                  <Icon
                    name={route.icon}
                    color={index == i ? colors.secondColor : ''}
                    type={route.iconName ? route.iconName : 'feather'}
                    size={15}
                  />
                  <Text style={[{ paddingLeft: 5 }, index == i && { color: colors.secondColor }]}>
                    {route.title}
                  </Text>
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
        showLoading={false}
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
    paddingTop: 16,
    paddingBottom: 6,
  },
});

//make this component available to the app
export default Search;
