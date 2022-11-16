import React from 'react';
import {View, StyleSheet} from 'react-native';
import { contain } from '../../node_modules/@hapi/hoek/lib/index.d';

const UserProfile = () => {
    return (
        <View style={styles.container}>
            <Text>Main View</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default UserProfile;
