import { StatusBar } from 'expo-status-bar';
import { useRef, useEffect } from 'react';
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

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// import FormHeader from './app/components/FormHeader';
// import FormSelectorBtn from './app/components/FormSelectorBtn';
// import LoginForm from './app/components/LoginForm';
// import SignupForm from './app/components/SignupForm';
// import ImageUpload from './app/components/ImageUpload';
// import axios from 'axios';

// const { width } = Dimensions.get('window');

import AppForm from './app/components/AppForm';
import ImageUpload from './app/components/ImageUpload';
import UserProfile from './app/components/UserProfile';

const StackNavigator = () => {
  return (
    <StackNavigator screenOptions={{headerShown: false}}>
      <StackScreen component={AppForm} name='AppForm' />
      <StackScreen component={ImageUpload} name='ImageUpload'/>
      <StackScreen component={UserProfile} name='UserProfile'/>
    </StackNavigator>
  )
};

export default function App() {

  // const animation = useRef(new Animated.Value(0)).current;

  // const scrollView = useRef();

  // const fetchApi = async (api) => {
  //   try {
  //     const res = await axios.get('http://localhost:8000/')
  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // useEffect(() => {
  //   fetchApi()
  // }, [])

  // const rightHeaderOpacity = animation.interpolate({
  //   inputRange: [0, width],
  //   outputRange: [1, 0]
  // });

  // const leftHeaderTranslateX = animation.interpolate({
  //   inputRange: [0, width],
  //   outputRange: [0, 40]
  // });

  // const rightHeaderTranslateY = animation.interpolate({
  //   inputRange: [0, width],
  //   outputRange: [0, -20]
  // });

  // const loginColorInterpolate = animation.interpolate({
  //   inputRange: [0, width],
  //   outputRange: ['rgba(27, 27, 51, 1)', 'rgba(27, 27, 51, 0.3)']
  // });

  // const signupColorInterpolate = animation.interpolate({
  //   inputRange: [0, width],
  //   outputRange: ['rgba(27, 27, 51, 0.3)', 'rgba(27, 27, 51, 1)']
  // });


  // return (
  //   <ImageBackground
  //     source={require('./assets/main-background.png')}
  //     resizeMode="cover"
  //     style={styles.backgroundImage}
  //   >
  //     <StatusBar style='light' />
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <View style={{ flex: 1, paddingTop: 100 }}>
  //         <View style={{ height: 80 }} >
  //           <FormHeader
  //             leftHeading='Welcome'
  //             rightHeading=' Back'
  //             subHeading='Smart Home Project'
  //             rightHeaderOpacity={rightHeaderOpacity}
  //             leftHeaderTranslateX={leftHeaderTranslateX}
  //             rightHeaderTranslateY={rightHeaderTranslateY}
  //           />
  //         </View>

  //         <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 40 }}>
  //           <FormSelectorBtn
  //             style={styles.borderLeft}
  //             backgroundColor={loginColorInterpolate}
  //             title='Login'
  //             onPress={() => scrollView.current.scrollTo({ x: 0 })}
  //           />
  //           <FormSelectorBtn
  //             style={styles.borderRight}
  //             backgroundColor={signupColorInterpolate}
  //             title='Sign up'
  //             onPress={() => scrollView.current.scrollTo({ x: width })}
  //           />
  //         </View>

  //         <ScrollView
  //           ref={scrollView}
  //           horizontal
  //           pagingEnable
  //           showsHorizontalScrollIndicator={false}
  //           scrollEventThrottle={16}
  //           onScroll={Animated.event(
  //             [{ nativeEvent: { contentOffset: { x: animation } } }], { useNativeDriver: false }
  //           )}
  //         >
  //           <LoginForm />
  //           <ScrollView>
  //             <SignupForm />
  //           </ScrollView>
  //         </ScrollView>
  //       </View>
  //     </SafeAreaView>
  //   </ImageBackground>

  //   // <ImageUpload />
  //   )
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   backgroundImage: {
//     width: '100%',
//     height: '100%',
//   },
//   borderLeft: {
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8
//   },
//   borderRight: {
//     borderTopRightRadius: 8,
//     borderBottomRightRadius: 8
//   }
// });


