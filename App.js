import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './app/screens/WelcomePage';
import { MyTabs } from './app/screens/MyTabs';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MyTabs}>
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            headerStyle: { backgroundColor: '#00000050' },
            headerTitleStyle: { color: 'white' },
            headerTitleAlign: 'center',
            title: 'Be Social',
          }}
        />

        <Stack.Screen name="Welcome" component={WelcomePage} />
      </Stack.Navigator>
    </NavigationContainer>
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
