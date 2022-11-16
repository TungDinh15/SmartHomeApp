import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { isValidObjField, updateError, isValidEmail } from '../utils/methods';

import { Formik } from 'formik';
import * as Yup from 'yup';

import client from '../api/client';

import { StackActions } from '@react-navigation/native';

// import { Container } from './styles';

const validationSchema = Yup.object({
    fullname: Yup
        .string()
        .trim()
        .min(3, 'Invalid Name')
        .required('Name is required!'),
    email: Yup
        .string()
        .email('Invalid email!')
        .required('Email is required!'),
    password: Yup
        .string()
        .trim()
        .min(8, 'Password is too weak!')
        .required('Password is required!'),
    confirmPassword: Yup
        .string()
        .equals([Yup.ref('password'), null], 'Password does not match!'),
});

const SignupForm = ({ navigation }) => {

    const userInfo = {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [error, setError] = useState('');

    const { fullname, email, password, confirmPassword } = userInfo;

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value })
    };

    const isValidForm = () => {
        // only accept if all the fields are valid
        if (!isValidObjField(userInfo))
            return updateError('Required all fields!', setError);
        // valid name with 3 or more characters
        if (!fullname.trim() || fullname.length < 3)
            return updateError('Invalid name!', setError);
        // only valid email is allowed
        if (!isValidEmail(email))
            return updateError('Invalid email!', setError);
        // password must have 8 or more characters
        if (!password.trim() || password.length < 8)
            return updateError('Password is less than 8 characters!', setError);
        // password and confirmPassword must be the same
        if (password !== confirmPassword)
            return updateError('Password does not match!', setError);

        return true;
    };

    const submitForm = () => {
        if (isValidForm()) {
            // submit form
            console.log(userInfo)
        }
    };

    const signUp = async (values, formikActions) => {
        const res = await client.post('/create-user', {
            ...values,
        })

        if (res.data.success) {

            const signInRes = await client.post('/sign-in',
                {
                    email: values.email,
                    password: values.password
                })
            navigation.dispatch(
                StackActions.replace('ImageUpload', {

                })
            )
        }

        console.log(res.data)
        formikActions.resetForm();
        formikActions.setSubmitting(false)

    };

    return (
        <FormContainer>
            <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={signUp}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => {

                    const { fullname, email, password, confirmPassword } = values;

                    return (
                        <>
                            <FormInput
                                value={fullname}
                                error={touched.fullName && errors.fullName}
                                onChangeText={handleChange('fullname')}
                                onBlur={handleBlur('fullname')}
                                label="Full Name"
                            //placeholder="Tung Dinh"
                            />
                            <FormInput
                                value={email}
                                error={touched.email && errors.email}
                                autoCapitalize='none'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                label="Email"
                            //placeholder="example@gmail.com"
                            />
                            <FormInput
                                value={password}
                                error={touched.password && errors.password}
                                autoCapitalize='none'
                                secureTextEntry="true"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                label="Password"
                            //placeholder="********"
                            />
                            <FormInput
                                value={confirmPassword}
                                error={touched.confirmPassword && errors.confirmPassword}
                                autoCapitalize='none'
                                secureTextEntry="true"
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                label="Confirm Password"
                            //placeholder="********"
                            />
                            <FormSubmitButton
                                submitting={isSubmitting}
                                onPress={handleSubmit}
                                title='SIGN UP'
                            />
                        </>
                    )
                }}
            </Formik>
        </FormContainer>
    )
};

const styles = StyleSheet.create({

});

export default SignupForm;