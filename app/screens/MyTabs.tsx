import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { Props } from '../types/common/props';
import { HomePage } from './MyTabs/HomePage';
import { ProfilePage } from './MyTabs/ProfilePage';
import NewEvent from './NewEvent';

const Tab = createBottomTabNavigator();
interface MyTabsProps extends Props {}

export function MyTabs(props: MyTabsProps) {
  return (
    <Tab.Navigator
      initialRouteName="NewEvent"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'Home')
            return <Icon name="home" size={30} type="antdesign" color={focused ? '#C06014' : 'gray'} />;
          else if (route.name == 'Profile')
            return <Icon name="user" size={40} type="evilicon" color={focused ? '#C06014' : 'gray'} />;
          else if (route.name == 'Search')
            return (
              <Icon name="control-point" type="metarial" size={30} color={focused ? '#C06014' : 'gray'} />
            );
          else if (route.name == 'NewEvent')
            return (
              <Icon name="control-point" type="metarial" size={40} color={focused ? '#C06014' : 'gray'} />
            );
        },

        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: { backgroundColor: '#F3F4ED' },
        headerStyle: { backgroundColor: '#C06014' },
        headerTitleStyle: { color: '#F3F4ED' },
      })}
    >
      <Tab.Screen name="Home" options={{ headerTitle: 'Akış' }} component={HomePage} />
      <Tab.Screen name="NewEvent" options={{ headerTitle: 'Etkinlik' }} component={NewEvent} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ headerTitle: 'Profil' }} />
    </Tab.Navigator>
  );
}
