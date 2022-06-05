import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './MyTabs/HomePage';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePage from './MyTabs/ProfilePage';
import { Props } from '../types/common/props';

const Tab = createBottomTabNavigator();
interface MyTabsProps extends Props {}

export function MyTabs(props: MyTabsProps) {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'Home')
            return <Icon name="home" size={30} type="antdesign" color={focused ? '#FF4C29' : 'gray'} />;
          else if (route.name == 'Profile')
            return <Icon name="user" size={40} type="evilicon" color={focused ? '#FF4C29' : 'gray'} />;
          else if (route.name == 'Search')
            return <Icon name="search1" type="antdesign" size={30} color={focused ? '#FF4C29' : 'gray'} />;
          else if (route.name == 'NewEvent')
            return (
              <Icon name="create-outline" type="ionicon" size={32} color={focused ? '#FF4C29' : 'gray'} />
            );
        },

        headerTitleAlign: 'center',
        title: 'Akış',
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#334756' },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Profile" children={() => <ProfilePage navigation={props.navigation} />} />
    </Tab.Navigator>
  );
}
