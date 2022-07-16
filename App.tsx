import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './app/screens/WelcomePage';
import { MyTabs } from './app/screens/MyTabs';
import LoginPage from './app/screens/LoginPage';
import Toast from 'react-native-toast-message';
import RegisterPageComponent from './app/screens/RegisterPage';
import { CommentsComponent } from './app/screens/Comments';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import UserList from './app/screens/UserList';
import { VisitedProfile } from './app/screens/VisitedProfile';
import colors from './app/styles/colors';
import NewPost from './app/screens/NewPost';
import NewEvent from './app/screens/NewEvent';
import AppNotifications from './app/components/AppNotifications';
import { Props } from './app/types/common/props';
import { navigationRef } from './app/RootNavigation';
import Notofications from './app/screens/Notifications';
import EventDetail from './app/screens/EventDetail';

const client = new ApolloClient({
  uri: 'https://quiet-retreat-10533.herokuapp.com/graphql',
  headers: {
    Authorization:
      'Bearer 24d633612d6d4ee6e9eeb1ad6b98db3311cb435be52f552d98714a4e0fcf20929c7e4d7765b5f932b67bd956d83dd70ba37cb4b229863606665fe923c0da2a7bb21f645867c8dd270860e66281bd1e59f4ed6fe44543d3302e5018c46cb30b1551730649f89de87f811f483a90059da6e2448a251380d59be9376f773cc50a7e',
  },
  cache: new InMemoryCache({
    typePolicies: {
      UsersPermissionsUser: { merge: true },
      Event: { merge: true },
      Comment: { merge: true },
    },
  }),
});

export default function App(props: Props) {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <ApolloProvider client={client}>
          <Stack.Navigator initialRouteName="MyTabs">
            <Stack.Screen
              name="Welcome"
              component={WelcomePage}
              options={{
                headerTitleStyle: { color: colors.headerTitleColor },
                title: 'Be Social',
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
          </Stack.Navigator>
        </ApolloProvider>
      </NavigationContainer>
      <Toast />
      <AppNotifications navigation={navigationRef} currentUserId={props.currentUserId} />
    </>
  );
}
