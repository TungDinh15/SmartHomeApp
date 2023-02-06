import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
    Switch,
} from 'react-native';
import { ref, onValue, set } from "firebase/database";
import { db } from '../../../firebase';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const DoorManage = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => {
    //     setIsEnabled(previousState => !previousState);
    // };

    // Get Door State in Firebase
    useEffect(() => {
        const getDataRef = ref(db, 'Door/');

        onValue(getDataRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Door status:', data);
            setIsEnabled(data)
        });
    }, []);

    // console.log(isEnabled);

    // Update Door State from App to Firebase
    const updateState = () => {
        set(ref(db, 'Door/'), !isEnabled);
        if (!isEnabled){
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Main Door',
                textBody: 'Door is opened successfully !',
            });
        } else {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Main Door',
                textBody: 'Door is closed successfully !',
            });
        };
    };

    return (
        <AlertNotificationRoot>
            <ImageBackground
                source={require('../../../assets/door.jpeg')}
                resizeMode="stretch"
                style={{ width: '100%', height: '100%' }}
            >
                <SafeAreaView
                    style={styles.container}
                >

                    <View
                        style={styles.titleContainer}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <Image
                                source={require('../../../assets/back.png')}
                                resizeMode='cover'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </TouchableOpacity>

                        <View
                        // style={{ borderWidth: 3 }}
                        >
                            <Text
                                style={{ color: 'white', fontSize: '35' }}
                            >
                                Door Admin
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => null}
                            style={styles.histButton}
                        >
                            <Image
                                source={require('../../../assets/hist.png')}
                                resizeMode='cover'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Main View */}
                    <View
                        style={styles.mainContainer}
                    >
                        <View
                            style={styles.manageContainer}
                        >
                            <Text
                                style={styles.manageText}
                            >
                                Main Door
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#28C904" }}
                                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                value={isEnabled}
                                onChange={() => updateState()}
                            />
                        </View>
                    </View>

                    {/* Title View */}

                </SafeAreaView>
            </ImageBackground>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        height: 50
    },
    backButton: {
        // borderWidth: 1,
        borderRadius: '50%',
        width: '14%',
        backgroundColor: 'white'
    },
    histButton: {
        // borderWidth: 1,
        borderRadius: '50%',
        width: '14%',
        backgroundColor: 'white'
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: '85%',
        height: 400,
        backgroundColor: '#FDF4A2',
        margin: 30,
        borderRadius: 30,
        opacity: 0.9
    },
    manageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '40%',
        borderRadius: 20,
        borderWidth: 2,
        margin: 20,
        backgroundColor: 'white',
    },
    manageText: {
        color: 'black',
        fontSize: '30',
        fontWeight: 'bold',
        marginBottom: 40
    }
})

export default DoorManage;