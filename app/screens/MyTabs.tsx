import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { Props } from '../types/common/props';
import { HomePage } from './MyTabs/HomePage';
import { ProfilePage } from './MyTabs/ProfilePage';
import NewEvent from './NewEvent';
import { TouchableOpacity, View, StyleSheet, Dimensions, Animated, Pressable } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();
interface MyTabsProps extends Props {}

export function MyTabs(baseProps: MyTabsProps) {
  const translateYAnim = new Animated.Value(-30);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(translateYAnim, { toValue: -65, duration: 500, useNativeDriver: true }).start();
    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, [translateYAnim]);

  const [focus, setFocus] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName="NewEvent"
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'Home')
            return (
              <Icon name="home" size={30} type="antdesign" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Profile')
            return (
              <Icon name="user" size={40} type="evilicon" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Search')
            return (
              <Icon
                name="control-point"
                type="metarial"
                size={40}
                color={focused ? colors.secondColor : 'gray'}
              />
            );
        },

        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: { backgroundColor: 'white' },
        headerStyle: { backgroundColor: colors.secondColor },
        headerTitleStyle: { color: 'white' },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerTitle: 'Akış' }}
        component={HomePage}
        listeners={() => ({ tabPress: () => setFocus(false) })}
      />
      <Tab.Screen
        name="NewEvent"
        listeners={() => ({ tabPress: () => setFocus(false) })}
        options={{
          headerTitle: 'Etkinlik',
          tabBarButton: props => (
            <>
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {focus && (
                  <>
                    <Pressable
                      onPress={() => {
                        setFocus(false);
                      }}
                      style={{
                        position: 'absolute',
                        top: -Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                      }}
                    ></Pressable>
                    <Animated.View
                      style={[
                        styles.customNavBarContainer,
                        { transform: [{ translateY: translateYAnim }], opacity: fadeAnim },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setFocus(false);
                          baseProps.navigation.navigate('NewEvent');
                        }}
                        style={styles.customTabBar}
                      >
                        <Icon type="simple-line-icon" name="event" size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.customTabBar}
                        onPress={() => {
                          setFocus(false);
                          baseProps.navigation.navigate('NewPost');
                        }}
                      >
                        <Icon type="ionicon" name="albums-outline" size={21} />
                      </TouchableOpacity>
                    </Animated.View>
                  </>
                )}

                <TouchableOpacity onPress={() => setFocus(!focus)}>
                  <Icon type="font-awesome" name="plus-circle" size={50} color={colors.secondColor} />
                </TouchableOpacity>
              </View>
            </>
          ),
        }}
        component={NewEvent}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerTitle: 'Profil' }}
        listeners={() => ({ tabPress: () => setFocus(false) })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  customTabBar: {
    width: 50,
    height: 50,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: colors.secondColor,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  customNavBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
