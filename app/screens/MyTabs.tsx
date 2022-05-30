import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePage } from './Home/HomePage';
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'Home')
            return <Icon name="home" size={30} type="antdesign" color={focused ? 'black' : 'gray'} />;
          else if (route.name == 'Profile')
            return <Icon name="user" size={40} type="evilicon" color={focused ? 'black' : 'gray'} />;
          else if (route.name == 'Search')
            return <Icon name="search1" type="antdesign" size={30} color={focused ? 'black' : 'gray'} />;
          else if (route.name == 'NewEvent')
            return <Icon name="create-outline" type="ionicon" size={32} color={focused ? 'black' : 'gray'} />;
        },

        headerStatusBarHeight: 10,
        headerTitleStyle: { color: 'black' },
        headerTitleAlign: 'center',
        title: 'Akış',
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
    </Tab.Navigator>
  );
}
