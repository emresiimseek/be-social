import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './app/screens/WelcomePage';
import { MyTabs } from './app/screens/MyTabs/MyTabsPage';
import LoginPage from './app/screens/LoginPage';
import Toast from 'react-native-toast-message';
import RegisterPageComponent from './app/screens/RegisterPage';
import { CommentsComponent } from './app/screens/CommentsPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import UserList from './app/screens/UserListPage';
import { VisitedProfile } from './app/screens/VisitedProfilePage';
import colors from './app/styles/colors';
import NewPost from './app/screens/NewPostPage';
import NewEvent from './app/screens/NewEventPage';
import AppNotifications from './app/components/AppNotifications';
import { Props } from './app/types/common/props';
import { navigationRef } from './app/RootNavigation';
import EventDetail from './app/screens/EventDetailPage';
import { io } from 'socket.io-client';
import { Notification } from './app/types/strapi/models/notification';
import { Item } from './app/types/strapi/base/base';
import { useEffect, useState } from 'react';
import { getItem } from './app/logic/helpers/useAsyncStorage';
import { STRAPI_API_URL, STRAPI_TOKEN } from '@env';
import PostDetail from './app/components/post/PostDetail';

const client = new ApolloClient({
  uri: `${STRAPI_API_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
  },
  cache: new InMemoryCache({
    typePolicies: {
      UsersPermissionsUser: { merge: true },
      Event: { merge: true },
      Comment: { merge: true },
      Post: { merge: true },
      Notification: { merge: true },
      EventRequest: { merge: true },
    },
  }),
});

export default function App(props: Props) {
  const [notification, setNotification] = useState<Notification | undefined>();
  const [token, setToken] = useState<number | undefined>();
  const [userId, setUserId] = useState<number | undefined>();

  const getToken = async () => {
    const token = await getItem<number>('token');
    const userId = await getItem<number>('userId');
    setUserId(userId);
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getToken();
    socket.off('notification:create').on('notification:create', listener);
  }, [token]);

  ///////Socket.io///////

  const socket = io(STRAPI_API_URL, {
    auth: {
      token,
    },
  });
  socket.on('connect', () => {
    console.log('socket connected', socket.active);
  });

  const listener = (item: Item<Notification>) => {
    setNotification(item.data.attributes);
    // socket.removeAllListeners();
  };

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <ApolloProvider client={client}>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={WelcomePage}
              options={{
                headerTitleStyle: { color: colors.headerTitleColor },
                title: 'Be Social',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{
                headerTintColor: 'white',
                title: 'Giriş',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterPageComponent}
              options={{
                title: 'Kayıt Ol',
                headerTintColor: 'white',
                headerTitleStyle: { color: colors.headerTitleColor },
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="MyTabs"
              component={MyTabs}
              options={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: colors.secondColor },
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Comments"
              component={CommentsComponent}
              options={{
                headerTintColor: 'white',
                title: 'Yorumlar',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="Follow"
              component={UserList}
              options={{
                headerTintColor: 'white',
                title: 'Takip Listesi',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="VisitedProfile"
              component={VisitedProfile}
              options={{
                headerTintColor: 'white',
                title: 'Profile',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="NewPost"
              component={NewPost}
              options={{
                headerTintColor: 'white',
                title: 'Post',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />

            <Stack.Screen
              name="NewEvent"
              component={NewEvent}
              options={{
                headerTintColor: 'white',
                title: 'Etkinlik',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="EventDetail"
              component={EventDetail}
              options={{
                headerTintColor: 'white',
                title: 'Etkinlik',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
            <Stack.Screen
              name="PostDetail"
              component={PostDetail}
              options={{
                headerTintColor: 'white',
                title: 'Gönderi',
                headerStyle: { backgroundColor: colors.secondColor },
              }}
            />
          </Stack.Navigator>
        </ApolloProvider>
      </NavigationContainer>
      <Toast />
      <AppNotifications userId={userId} notification={notification} />
    </>
  );
}
