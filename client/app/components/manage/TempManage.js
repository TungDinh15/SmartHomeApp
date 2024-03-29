import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
    Switch
} from 'react-native';
import { onValue, ref, set } from 'firebase/database';
import { db } from '../../../firebase';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const TempManage = ({ navigation }) => {

    const [temp, setTemp] = useState(0);

    const [isEnabled3, setIsEnabled3] = useState(false);
    const [isEnabled4, setIsEnabled4] = useState(false);

    useEffect(() => {
        const getDataRef = ref(db, 'Temp/');

        onValue(getDataRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data)
            setTemp(data.currentTemp);
            setIsEnabled3(data.fan1);
            setIsEnabled4(data.fan2);

            console.log('Temperature:', data.currentTemp);
            console.log('Fan 1 status:', data.fan1);
            console.log('Fan 2 status:', data.fan2);
        });
    }, []);

    // update fan 1 State from App to Firebase 
    const updateState3 = () => {
        set(ref(db, 'Temp/fan1'), !isEnabled3);
        if (!isEnabled3) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Temperature',
                textBody: 'Living room fan is opened successfully !',
            });
        } else {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Temperature',
                textBody: 'Living room fan is closed successfully !',
            });
        };
    };

    // Update fan 2 State from App to Firebase
    const updateState4 = () => {
        set(ref(db, 'Temp/fan2'), !isEnabled4);
        if (!isEnabled4) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Temperature',
                textBody: 'Bedroom fan is opened successfully !',
            });
        } else {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Temperature',
                textBody: 'Bedroom fan is closed successfully !',
            });
        };
    };

    return (
        <AlertNotificationRoot>
            <ImageBackground
                source={require('../../../assets/temperature.jpeg')}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
            >
                <SafeAreaView
                    style={styles.container}
                >
                    {/* Title View */}
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
                                Temp Admin
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
                        {/* Current Temp */}
                        <View
                            style={styles.manageContainer}
                        >
                            <Text
                                style={styles.manageText}
                            >
                                Temperature:
                            </Text>
                            <Text
                                style={[styles.manageText, { color: 'red', fontSize: '35' }]}
                            >
                                {temp}°C
                            </Text>
                        </View>

                        {/* Manage Fan 1*/}
                        <View
                            style={styles.manageContainer}
                        >
                            <Text
                                style={styles.manageText}
                            >
                                Living Room Fan
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#28C904" }}
                                thumbColor={isEnabled3 ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                value={isEnabled3}
                                onChange={() => updateState3()}
                            />

                        </View>
                        {/* Manage Fan 2 */}
                        <View
                            style={styles.manageContainer}
                        >
                            <Text
                                style={styles.manageText}
                            >
                                Bedroom Fan
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#28C904" }}
                                thumbColor={isEnabled4 ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                value={isEnabled4}
                                onChange={() => updateState4()}
                            />
                        </View>
                    </View>
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
        height: '80%',
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
        height: '25%',
        borderRadius: 20,
        borderWidth: 2,
        margin: 20,
        backgroundColor: 'white',
    },
    manageText: {
        color: 'black',
        fontSize: '30',
        fontWeight: 'bold',
        marginBottom: 30
    }
});

export default TempManage;
