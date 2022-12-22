import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import Home from './components/Home';
import History from './components/History';
import { useLogin } from './context/LoginProvider';
import { signOut } from './api/user';



const Drawer = createDrawerNavigator();

const CustomDrawer = props => {

    const { setIsLoggedIn, profile } = useLogin();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: '#f6f6f6',
                        marginBottom: 20,
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 20 }}>{profile.fullname}</Text>
                        <Text style={{ fontSize: 20 }}>{profile.email}</Text>
                    </View>
                    <Image
                        source={require('../assets/user.png')}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                </View>

                <DrawerItemList {...props} />

            </DrawerContentScrollView>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 80,
                    backgroundColor: '#f6f6f6',
                    padding: 20,
                }}
                onPress={async () => {

                    const isLoggedOut = await signOut()

                    if (isLoggedOut) {
                        setIsLoggedIn(false)
                    }
                }}
            >
                <Text style={{ fontSize: 20 }}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitle: '',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20
                },
            }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen component={Home} name='Home' />
            <Drawer.Screen component={History} name='History' />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
