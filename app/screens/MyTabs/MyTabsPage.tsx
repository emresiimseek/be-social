import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { Props } from '../../types/common/props';
import { HomePage } from './HomePage';
import { ProfilePage } from './ProfilePage';
import { useState } from 'react';
import colors from '../../styles/colors';
import NewButtons from '../../components/CreateOptionButtons';
import NewItem from './NewItemPage';
import Notifications from './NotificationsPage';
import Search from './SearchPage';

const Tab = createBottomTabNavigator();
interface MyTabsProps extends Props {}

export function MyTabs(baseProps: MyTabsProps) {
  const [focus, setFocus] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'Home')
            return (
              <Icon name="home" size={30} type="octicon" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Search')
            return (
              <Icon name="search" size={30} type="octicon" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Notifications')
            return (
              <Icon name="bell" size={30} type="octicon" color={focused ? colors.secondColor : 'gray'} />
            );
          else if (route.name == 'Profile')
            return (
              <Icon name="person" size={30} type="octicon" color={focused ? colors.secondColor : 'gray'} />
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
        name="Search"
        options={{ headerTitle: 'Arama' }}
        component={Search}
        listeners={() => ({ tabPress: () => setFocus(false) })}
      />
      <Tab.Screen
        name="NewItem"
        component={NewItem}
        options={{
          tabBarButton: props => <NewButtons focused={focus} setFocus={setFocus} />,
        }}
        listeners={() => ({ tabPress: () => setFocus(false) })}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
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
