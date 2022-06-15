import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { Props } from '../types/common/props';
import { HomePage } from './MyTabs/HomePage';
import { ProfilePage } from './MyTabs/ProfilePage';

const Tab = createBottomTabNavigator();
interface MyTabsProps extends Props {}

export function MyTabs(props: MyTabsProps) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: { backgroundColor: '#334756' },
        headerStyle: { backgroundColor: '#334756' },
        headerTitleStyle: { color: 'white' },
      })}
    >
      <Tab.Screen name="Home" options={{ headerTitle: 'Akış' }} component={HomePage} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ headerTitle: 'Profil' }} />
    </Tab.Navigator>
  );
}
