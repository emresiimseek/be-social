import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './app/screens/WelcomePage';
import { MyTabs } from './app/screens/MyTabs';
import LoginPage from './app/screens/LoginPage';
import Toast from 'react-native-toast-message';
import RegisterPageComponent from './app/screens/RegisterPage';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{
              headerStyle: { backgroundColor: '#000000c0' },
              headerTitleStyle: { color: 'white' },
              headerTitleAlign: 'center',
              title: 'Be Social',
            }}
          />
          <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Giriş' }} />
          <Stack.Screen name="Register" component={RegisterPageComponent} options={{ title: 'Kayıt Ol' }} />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{
              headerStyle: { backgroundColor: '#00000050' },
              headerTitleStyle: { color: 'white' },
              headerTitleAlign: 'center',
              title: 'Be Social',
              headerShown: false,
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
