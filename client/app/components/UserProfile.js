import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
        
        >
            <Drawer.Screen component={Home} name='Home' />
            <Drawer.Screen component={Task} name='Task' />
        </Drawer.Navigator>
    )
}

const UserProfile = () => {
    return (
        <ImageBackground
            source={require('../../assets/main-background.png')}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
        >
            <StatusBar style='light' />
                <NavigationContainer>
                    <DrawerNavigator />
                </NavigationContainer>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({})

export default UserProfile;
