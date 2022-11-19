import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';

const Home = () => {
    return (
        <ImageBackground
            source={require('../../assets/home-background.jpeg')}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
        >
            <SafeAreaView style={styles.container}>
                <Text
                style={{fontSize: '30', fontWeight: 'bold', color: 'white'}}
                >
                    HomeM
                </Text>
                <ScrollView style={styles.scrollView}>

                    <View style={styles.tagFeature}>
                        <ImageBackground
                            source={require('../../assets/door.jpeg')}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                            borderRadius="40%"
                        >
                            <View style={styles.optionContainer}>
                                <View style={styles.optionTagContainer}>
                                    <Text style={styles.optionTagText} >Monitor</Text>
                                </View>
                                <View style={styles.optionTagContainer}>
                                    <Text style={styles.optionTagText} >Manage</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.tagFeature}>
                        <ImageBackground
                            source={require('../../assets/light.jpeg')}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                            borderRadius="40%"
                        >
                            <View style={styles.optionContainer}>
                                <View style={styles.optionTagContainer}>
                                    <Text style={styles.optionTagText} >Monitor</Text>
                                </View>
                                <View style={styles.optionTagContainer}>
                                    <Text style={styles.optionTagText} >Manage</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.tagFeature}>
                        <ImageBackground
                            source={require('../../assets/temperature.jpeg')}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                            borderRadius="40%"
                        >
                            <View style={styles.optionContainer}>
                                <View style={styles.optionTagContainer}>
                                    <Text style={styles.optionTagText} >Monitor</Text>
                                </View>
                                <View style={styles.optionTagContainer}>
                                    <Text style={styles.optionTagText} >Manage</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
        // backgroundColor: 'pink', 
        marginHorizontal: 100,
    },
    tagFeature: {
        width: '90%',
        height: 300,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'red',
        margin: 20,
        borderRadius: '40%',
        opacity: 0.95
    },
    optionContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        marginTop: '55%',
        // backgroundColor: 'pink',
        // borderWidth: 1,
    },
    optionTagContainer: {
        width: '45%',
        height: '70%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20%',
        borderWidth: '2',
        opacity: 0.85,
    },
    optionTagText: {
        color: 'black',
        // fontWeight: 'bold',
        fontSize: '22',
    }
})

export default Home;
