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
import { ref, onValue, set } from "firebase/database";
import { db } from '../../../firebase';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const LightManage = ({ navigation }) => {

    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

    // Get realtime data from Firebase
    useEffect(() => {
        const getDataRef = ref(db, '/Light');

        onValue(getDataRef, (snapshot) => {
            const data = snapshot.val();

            console.log('Light 1 status:', data.light1);
            setIsEnabled1(data.light1);

            console.log('Light 2 status:', data.light2);
            setIsEnabled2(data.light2);
        });
    }, []);

    // Update Light 1 State from App to Firebase
    const updateState1 = () => {
        set(ref(db, 'Light/light1'), !isEnabled1);
        if (!isEnabled1) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Light',
                textBody: 'Living room light is opened successfully !',
            });
        } else {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Light',
                textBody: 'Living room light is closed successfully !',
            });
        };
    };

    // Update Light 2 State from App to Firebase
    const updateState2 = () => {
        set(ref(db, 'Light/light2'), !isEnabled2);
        if (!isEnabled2) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Light',
                textBody: 'Bedroom light is opened successfully !',
            });
        } else {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Light',
                textBody: 'Bedroom light is closed successfully !',
            });
        };
    };

    return (
        <AlertNotificationRoot>
            <ImageBackground
                source={require('../../../assets/light.jpeg')}
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
                                Light Admin
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
                        {/* Light 1 */}
                        <View
                            style={styles.manageContainer}
                        >
                            <Text
                                style={styles.manageText}
                            >
                                Living room Light
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#28C904" }}
                                thumbColor={isEnabled1 ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                // onValueChange={toggleSwitch1}
                                value={isEnabled1}
                                onChange={() => updateState1()}
                            />

                        </View>

                        {/* Light 2 */}
                        <View
                            style={styles.manageContainer}
                        >
                            <Text
                                style={styles.manageText}
                            >
                                Bedroom Light
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#28C904" }}
                                thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                value={isEnabled2}
                                onChange={() => updateState2()}
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
        height: '60%',
        backgroundColor: 'skyblue',
        margin: 30,
        marginTop: 60,
        borderRadius: 30,
        opacity: 0.9
    },
    manageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '40%',
        borderWidth: 1,
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
    },
    manageText: {
        color: 'black',
        fontSize: '30',
        fontWeight: 'bold',
        marginBottom: 30
    }
});

export default LightManage;