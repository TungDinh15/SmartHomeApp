import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// import { Container } from './styles';

const FormInput = (props) => {

    const { placeholder, label, error } = props

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                }}
            >
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginBottom: 10,
                }}>
                    {label}
                </Text>
                {error ?
                    <Text style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginBottom: 10,
                    }}>
                        {error}
                    </Text>
                    : null}
            </View>
            <TextInput
                {...props}
                placeholder={placeholder}
                placeholderTextColor='yellow'
                style={styles.input} />
        </>
    )
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'white',
        height: 50,
        borderRadius: 8,
        fontSize: 20,
        paddingLeft: 10,
        marginBottom: 20,
        color: 'yellow'
    }
});

export default FormInput;