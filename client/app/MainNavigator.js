import { StatusBar } from 'expo-status-bar';
import {
    ImageBackground,
} from 'react-native';
import { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AppForm from './components/AppForm';
import ImageUpload from './components/ImageUpload';
import UserProfile from './components/UserProfile';
import DrawerNavigator from './DrawerNavigator';
import { useLogin } from './context/LoginProvider';

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

const MainNavigator = () => {

    const { isLoggedIn } = useLogin()
    return isLoggedIn ?
        <ImageBackground
            source={require('../assets/main-background.png')}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
        >
            <StatusBar style='light' />
            <DrawerNavigator />
        </ImageBackground>
        :
        <ImageBackground
            source={require('../assets/main-background.png')}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
        >
            <StatusBar style='light' />
            <StackNavigator />
        </ImageBackground>
};

export default MainNavigator;