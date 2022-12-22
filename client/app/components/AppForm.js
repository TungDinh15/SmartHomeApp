import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// import sub component
import FormHeader from './FormHeader';
import FormSelectorBtn from './FormSelectorBtn';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AppLoader from './AppLoader';
import useLogin from '../context/LoginProvider';

import axios from 'axios';

const { width } = Dimensions.get('window');

// ************
const AppForm = ({ navigation }) => {

    const animation = useRef(new Animated.Value(0)).current;

    const scrollView = useRef();

    // const { loginPending } = useLogin()

    const fetchApi = async (api) => {
        try {
            const res = await axios.get('http://localhost:8000/')
            console.log(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const rightHeaderOpacity = animation.interpolate({
        inputRange: [0, width],
        outputRange: [1, 0]
    });

    const leftHeaderTranslateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, 40]
    });

    const rightHeaderTranslateY = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, -20]
    });

    const loginColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27, 27, 51, 1)', 'rgba(27, 27, 51, 0.3)']
    });

    const signupColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27, 27, 51, 0.3)', 'rgba(27, 27, 51, 1)']
    });


    return (

        <ImageBackground
            source={require('../../assets/main-background.png')}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            {/* <StatusBar style='light' /> */}
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingTop: 100 }}>
                    <View style={{ height: 80 }} >
                        <FormHeader
                            leftHeading='Welcome'
                            rightHeading=' Back'
                            subHeading='HomeM'
                            rightHeaderOpacity={rightHeaderOpacity}
                            leftHeaderTranslateX={leftHeaderTranslateX}
                            rightHeaderTranslateY={rightHeaderTranslateY}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            marginBottom: 40
                        }}
                    >
                        <FormSelectorBtn
                            style={styles.borderLeft}
                            backgroundColor={loginColorInterpolate}
                            title='Login'
                            onPress={() => scrollView.current.scrollTo({ x: 0 })}
                        />
                        <FormSelectorBtn
                            style={styles.borderRight}
                            backgroundColor={signupColorInterpolate}
                            title='Sign up'
                            onPress={() => scrollView.current.scrollTo({ x: width })}
                        />
                    </View>

                    <ScrollView
                        ref={scrollView}
                        horizontal
                        pagingEnable
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: animation } } }],
                            { useNativeDriver: false }
                        )}
                    >
                        <LoginForm navigation={navigation} />
                        <ScrollView>
                            <SignupForm navigation={navigation} />
                        </ScrollView>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground>
        // {/* {loginPending ? <AppLoader /> : null} */}
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    borderLeft: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    borderRight: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    }
});

export default AppForm;
