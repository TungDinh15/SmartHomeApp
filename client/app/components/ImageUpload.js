import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Text,
    ImageBackground,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';

const ImageUpload = (props) => {

    const [profileImage, setProfileImage] = useState('');
    const { token } = props.route.params;

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, We need permissions to make this work!');
        }

        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });

            if (!response.cancelled) {
                setProfileImage(response.uri)
            }
        }
    };

    const uploadProfileImage = async () => {

        const formData = new FormData()
        formData.append('profile', {
            name: new Date() + "_profile",
            uri: profileImage,
            type: 'image/png'
        })

        try {
            const res = await client.post('/upload-profile', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    authorization: `JWT ${token}`
                }
            });

            if (res.data.success) {
                props.navigation.dispatch(
                    StackActions.replace('DrawNavigator')
                );
            }
        } catch {
            console.log(error.message)
        }
    };

    // const skipToMain = () => {
    //     navigation.dispatch(
    //         StackActions.replace('UserProfile')
    //     )
    // };

    return (
        <ImageBackground
            source={require('../../assets/main-background.png')}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.uploadBtnContainer}
                    onPress={openImageLibrary}
                >
                    {profileImage ?
                        <Image
                            source={{ uri: profileImage }}
                            style=
                            {{
                                width: '100%',
                                height: '100%'
                            }}
                        /> :
                        <Text style={styles.uploadBtn}>
                            Upload Profile Image
                        </Text>}
                </TouchableOpacity>
                <Text
                    style={styles.skipBtn}
                    onPress={() => props.navigation.dispatch(
                        StackActions.replace('DrawNavigator')
                    )}
                >
                    Skip
                </Text>
                {profileImage ? (
                    <Text
                        style={[styles.skipBtn, { backgroundColor: 'green', color: 'white' }]}
                        onPress={uploadProfileImage}
                    >
                        Upload
                    </Text>
                ) : null}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBtnContainer: {
        width: 250,
        height: 250,
        borderRadius: 125,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 4,
        borderColor: 'white',
        overflow: 'hidden',
    },
    uploadBtn: {
        textAlign: 'center',
        fontSize: 30,
        color: 'yellow',
        fontWeight: '15',
        opacity: 0.7
    },
    skipBtn: {
        textAlign: 'center',
        marginTop: 15,
        padding: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textTransform: 'uppercase',
        letterSpacing: 2,
        opacity: 0.8
    }
})

export default ImageUpload;