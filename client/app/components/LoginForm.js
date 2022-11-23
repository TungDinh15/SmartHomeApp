import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TextInput 
} from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { isValidObjField, updateError, isValidEmail } from '../utils/methods';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';

// import { Container } from './styles';

const LoginForm = () => {

    const { setIsLoggedIn, setProfile } = useLogin();

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const { email, password } = userInfo;

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value })
    };

    const isValidForm = () => {
        if (!isValidObjField(userInfo))
            return updateError('Required All Fields!', setError);
        if (!isValidEmail(email))
            return updateError('Invalid Email!', setError);
        if (!password.trim() || password.length < 8)
            return updateError('Password is not strong enough!', setError);

        return true
    }

    const submitForm = async () => {
        if (isValidForm()) {
            try {
                const res = await client.post('/sign-in', { ...userInfo });

                if (res.data.success) {
                    setUserInfo({
                        email: '',
                        password: ''
                    });
                    setProfile(res.data.user);
                    setIsLoggedIn(true)
                }

                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    return (
        <FormContainer>
            {error ?
                <Text
                    style={{
                        color: 'white', fontSize: 22, textAlign: 'center', fontWeight: 'bold'
                    }}
                >
                    {error}
                </Text>
                : null}
            <FormInput
                value={email}
                onChangeText={(value) => handleOnChangeText(value, 'email')}
                label="Email"
                //placeholder="example@gmail.com"
                autoCapitalize='none'
            />
            <FormInput
                value={password}
                onChangeText={(value) => handleOnChangeText(value, 'password')}
                label="Password"
                //placeholder="********"
                autoCapitalize='none'
                secureTextEntry
            />
            <FormSubmitButton
                onPress={submitForm}
                title='LOGIN'
            />
        </FormContainer>
    )
};

const styles = StyleSheet.create({

});

export default LoginForm;