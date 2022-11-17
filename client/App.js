import { StatusBar } from 'expo-status-bar';
import { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import AppForm from './app/components/AppForm';
import ImageUpload from './app/components/ImageUpload';
import UserProfile from './app/components/UserProfile';

import DrawerNavigator from './app/DrawerNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
      <Stack.Screen component={ImageUpload} name='ImageUpload' />
      <Stack.Screen component={UserProfile} name='UserProfile' />
    </Stack.Navigator>
  )
};

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <ImageBackground
        source={require('./assets/main-background.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      >
        <StackNavigator />
      </ImageBackground>
    </NavigationContainer>
  );
};



