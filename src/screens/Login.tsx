import { bindActionCreators } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {SafeAreaView, View} from 'react-native';
import { Button, Card, TextInput, Text, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import { AppState } from '../store/AppState';
import { hide, show } from '../store/loading/loading.actions';
import { LoadingState } from '../store/loading/LoadingState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordReset, recoverPasswordSuccess } from '../store/login/login.actions';
import { LoginState } from '../store/login/LoginState';
import { loginForm } from '../utils/login.form';
import { loginStyle } from '../utils/loginStyle';
import {AddEventScreen} from './AddEvent'

interface LoginScreenProps {
    navigation: any;
    loadingState: LoadingState;
    loginState: LoginState;
    login: Function;
    loginFail: Function;
    loginSuccess: Function;
    recoverPassword: Function; 
    recoverPasswordFail: Function;
    recoverPasswordReset: Function;
    recoverPasswordSuccess: Function;
    hideLoading: Function;
    showLoading: Function;

}

export const LoginScreen = (props: LoginScreenProps) => {

    const addEvent = () => props.navigation.navigate("Add Event")
    
    const [recoveryEmail, setRecoveryEmail] = useState("");
    const [userLogin, setUserLogin] = useState({email: "", password: ""});

    useEffect(() => {
        if (props.loginState.isRecoveringPassword){
            props.showLoading();

            AuthService.recoverPassword(recoveryEmail).then(() => {
                props.recoverPasswordSuccess();
            }).catch(error => {
                props.recoverPasswordFail(error);
            })
                
        } 
        else{
            props.hideLoading();
        }

    }, [props.loginState.isRecoveringPassword])

    useEffect(() => {
        if (props.loginState.isLoggingIn){
            props.showLoading();

            AuthService.login(userLogin.email, userLogin.password).then(user => {
                props.loginSuccess(user);
            }).catch(error => {
                props.loginFail(error);
            })
        }
        else{
            props.hideLoading();
        }
    }, [props.loginState.isLoggingIn]);

    useEffect(() => {
        if (props.loginState.isLoggedIn){
            props.hideLoading();
            props.navigation.navigate("Map");

        }
    }, [props.loginState.isLoggedIn]);


    const forgotEmailPassword = (email: string) => {
        setRecoveryEmail(email);
        props.recoverPassword();
        /*
        props.showLoading();
        setTimeout(() => {
            props.hideLoading();
        }, 3000)
        */
    };
    const register = () => props.navigation.navigate("Register")
    const login = (userLogin: {email:string, password: string}) => {
        setUserLogin(userLogin);
        props.login();
    }

    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Login Here" titleStyle={loginStyle.cardTitle}></Card.Title>
                     <Card.Content>
                        <Formik initialValues={{email: "", password: ""}} onSubmit={login} validationSchema={loginForm}>
                            {({handleSubmit, handleChange, errors, setFieldTouched, touched, values}) => (
                                <>
                                <TextInput label="Email" keyboardType="email-address" onChangeText={handleChange("email")} onFocus={() => setFieldTouched('email')} testID="email"></TextInput>
                                {
                                    touched.email && errors.email?
                                    <Text testID='error-email' style={{color: "black"}}>{errors.email}</Text>
                                    : null
                                }
                                <TextInput label="Password" secureTextEntry={true} onChangeText={handleChange("password")} onFocus={() => setFieldTouched('password')} testID="password"></TextInput>
                                {
                                    touched.password && errors.password?
                                    <Text testID='error-password' style={{color: "black"}}>{errors.password}</Text>
                                    : null
                                }
                                <Button onPress={ () => forgotEmailPassword (values.email)} 
                                uppercase={false} 
                                style={loginStyle.cardButton} 
                                testID="recoveryButton" 
                                disabled={values.email == '' || errors.email ? true : false}>
                                Forgot Email/Password
                                </Button>
                                
                                <Button onPress={handleSubmit} 
                                mode="contained" 
                                style={loginStyle.cardButton} 
                                testID="loginButton">Login
                                </Button>
                                
                                <Button onPress={register} 
                                style={loginStyle.cardButton} 
                                testID="registerButton">Register
                                </Button>
                                
                                <Button onPress={addEvent} 
                                style={loginStyle.cardButton} >Add Event
                                </Button>
                                
                                
                                </>
                            )}
                        </Formik>
                    </Card.Content>
                </Card>
            </View>
            {
                props.loginState.isRecoveredPassword ?
                <Snackbar
                    duration={5000}
                    visible={true}
                    onDismiss={() => props.recoverPasswordReset()}
                    testID="recoverPasswordSuccess">
                    Recovery email sent
                </Snackbar>
                : null
            }
            {
                props.loginState.error ?
                <Snackbar
                    duration={5000}
                    visible={true}
                    onDismiss={() => props.recoverPasswordReset()}
                    testID="errorMessage">
                    {props.loginState.error.message}
                </Snackbar>
                : null
            }
        </SafeAreaView>
    );

}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    loginState: store.login
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        login: login,
        loginFail: loginFail,
        loginSuccess: loginSuccess,
        recoverPassword: recoverPassword,
        recoverPasswordFail: recoverPasswordFail,
        recoverPasswordReset: recoverPasswordReset,
        recoverPasswordSuccess: recoverPasswordSuccess,
        showLoading: show,
        hideLoading: hide,
     }, dispatch)
)

  

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
