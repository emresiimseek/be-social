import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './app/screens/WelcomePage';
import { MyTabs } from './app/screens/MyTabs';
import LoginPage from './app/screens/LoginPage';
import Toast from 'react-native-toast-message';
import RegisterPageComponent from './app/screens/RegisterPage';
import CommentsComponent from './app/screens/Comments';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MyTabs">
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{
              headerTintColor: 'white',
              title: 'Be Social',
              headerStyle: { backgroundColor: '#33475699' },
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              headerTintColor: 'white',
              title: 'Giriş',
              headerStyle: { backgroundColor: '#33475699' },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPageComponent}
            options={{
              title: 'Kayıt Ol',
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#33475699' },
            }}
          />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#33475699' },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsComponent}
            options={{
              headerTintColor: 'white',
              title: 'Yorumlar',
              headerStyle: { backgroundColor: '#33475699' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
