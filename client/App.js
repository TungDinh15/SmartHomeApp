import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './app/MainNavigator';
import LoginProvider from './app/context/LoginProvider';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <StatusBar style='light' />
        <ImageBackground
          source={require('./assets/main-background.png')}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        >
          <MainNavigator />
        </ImageBackground>
      </NavigationContainer>
    </LoginProvider>
  );
};



