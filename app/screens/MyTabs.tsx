import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { Props } from '../types/common/props';
import { HomePage } from './MyTabs/HomePage';
import { ProfilePage } from './MyTabs/ProfilePage';
import { useState } from 'react';
import colors from '../styles/colors';
import NewButtons from '../components/common/NewButtons';
import NewItem from './NewItem';
import Notofications from './Notifications';
import Search from './Search';

const Tab = createBottomTabNavigator();
interface MyTabsProps extends Props {}

export function MyTabs(baseProps: MyTabsProps) {
  const [focus, setFocus] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName="Notifications"
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'Home')
            return (
              <Icon name="home" size={30} type="feather" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Profile')
            return (
              <Icon name="user" size={30} type="feather" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Notifications')
            return (
              <Icon name="bell" size={30} type="feather" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'NewPost')
            return (
              <Icon name="user" size={30} type="feather" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Search')
            return (
              <Icon name="search" size={30} type="feather" color={focused ? colors.secondColor : 'gray'} />
            );
        },

        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: { backgroundColor: 'white', height: 90 },
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
        name="Search"
        options={{ headerTitle: 'Arama' }}
        component={Search}
        listeners={() => ({ tabPress: () => setFocus(false) })}
      />
      <Tab.Screen
        name="NewItem"
        component={NewItem}
        options={{
          tabBarButton: props => (
            <NewButtons focused={focus} setFocus={setFocus} navigation={baseProps.navigation} />
          ),
        }}
        listeners={() => ({ tabPress: () => setFocus(false) })}
      />

      <Tab.Screen
        name="Notifications"
        component={Notofications}
        options={{ headerTitle: 'Bildirimler' }}
        listeners={() => ({ tabPress: () => setFocus(false) })}
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
