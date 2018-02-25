import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Keyboard, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import metrics from '../../config/metrics';
import store from '../../service/store';
import { setWeek, setUsername } from '../../service/action';

const resetAction = (route) => {
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: route, params: { week: 1 } })
        ]
    })
}

class Login extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            borderBottomWidth: 0,
            elevation: 0
        },
        title: 'Masuk '
    }

    state = {
        username: '',
        password: '',
        isLoggingIn: false
    }

    login() {
        this.setState({ isLoggingIn: true });
        let request = {
            username: this.state.username,
            password: this.state.password
        }
        let formBody = [];
        for (let key in request) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(request[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch(metrics.BASE_URL + '/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.status == 'success') {
                    this.setState({ isLoggingIn: false });
                    store.dispatch(setWeek(responseJson.minggu));
                    store.dispatch(setUsername(this.state.username));
                    if (responseJson.status_reset) {
                        this.props.navigation.navigate('additional', { type: 'reset', username: this.state.username })
                    } else {
                        this.props.navigation.dispatch(resetAction(this.props.userType));
                    }
                } else {
                    Alert.alert('Pemberitahuan', 'Username/Password anda salah')
                    this.setState({ isLoggingIn: false })
                }
            })
    }

    renderActivityIndicator() {
        if (this.state.isLoggingIn) {
            return (
                <ActivityIndicator size='large' />
            )
        }
    }
    
    render() {
        const { navigate, dispatch, state } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Sehati</Text>
                </View>
                <View style={styles.content}>
                    <CustomTextInput
                        placeholder='Username'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ username: value })}
                    />
                    <CustomTextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ password: value })}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    <CustomButton
                        text='Masuk'
                        textStyle={styles.text}
                        buttonStyle={styles.button}
                        onPress={() => this.login()}
                    />
                    <Text onPress={() => navigate('forgetPasswordEmail')} style={[styles.text, { color: 'white', marginBottom: 10 }]}>Lupa kata sandi?</Text>
                    {this.renderActivityIndicator()}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(92, 234, 151)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        flex: 1,
        justifyContent: 'center'
    },

    titleText: {
        fontFamily: 'Baloo-Regular',
        fontSize: 50,
        color: 'white'
    },

    content: {
        flex: 1.5,
        alignItems: 'center'
    },

    text: {
        fontFamily: 'roboto-regular'
    },

    button: {
        backgroundColor: 'white'
    },

    textInput: {
        backgroundColor: '#FFFA',
        width: metrics.DEVICE_WIDTH * 0.8,
        borderRadius: 5,
        marginBottom: 10
    }
})

const mapStateToProps = (state) => {
    return {
        userType: state.setUserType.userType
    }
}

export default connect(mapStateToProps)(Login);
