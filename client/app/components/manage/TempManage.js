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
import { onValue, ref } from 'firebase/database';
import { db } from '../../../firebase';

const TempManage = ({ navigation }) => {

    const [temp, setTemp] = useState(0);

    const [isEnabled1, setIsEnabled1] = useState(false);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    useEffect(() => {
        const getDataRef = ref(db, 'Temp/');

        onValue(getDataRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            // console.log(data.currentTemp);
            setTemp(data.currentTemp);
        });
    }, []);

    console.log(temp);

    return (
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
                            thumbColor={isEnabled1 ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch1}
                            value={isEnabled1}
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
                            thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                        />

                    </View>
                </View>
            </SafeAreaView>

        </ImageBackground>
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
