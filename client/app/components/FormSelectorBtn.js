import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';

// import { Container } from './styles';

const components = ({ title, backgroundColor, style, onPress }) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Animated.View style={[styles.container, style, { backgroundColor }]}>
                <Text style={styles.title}>{title}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: '50%',
        backgroundColor: '#1b1b33',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
    }
});

export default components;