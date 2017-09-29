import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import GoogleSignIn from 'react-native-google-sign-in';
import { NavigationActions } from 'react-navigation';

import metrics from '../../config/metrics'
import store from '../../service/store'
import { setUserRegisterInfo, setUserType, storeNavigator, setWeek, setUsername } from '../../service/action'
import CustomButton from '../../components/CustomButton';

const IOS_CLIENT_ID = '124374796192-egto6r03jkso5ri709os1s96f45jnhkp.apps.googleusercontent.com'
const resetAction = (route) => {
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: route, params: { week: 1 } })
        ]
    })
}

class LoginRegister extends Component {

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
        headerBackTitle: null,
        title: 'Masuk'
    }

    componentDidMount() {
        FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native)
        store.dispatch(setUserType('main'))
        store.dispatch(storeNavigator(this.props.navigation));
    }

    // async logInWithFacebook() {
    //     const { type, token } = await Facebook.logInWithReadPermissionsAsync('992563777532157', {
    //         permissions: ['public_profile'],
    //     })
    //     if (type == 'success'){
    //         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
    //         const responseJson = await response.json()
    //         let userData = {
    //             username: responseJson.id,
    //             fullName: responseJson.name,
    //             password: 'nopassword',
    //             email: '',
    //             login_type: 'facebook'
    //         }
    //         store.dispatch(setUserRegisterInfo(userData))
    //         this.props.navigation.navigate('additional')
    //     }
    // }

    // async logInWithGoogle(){
    //     const result = await Google.logInAsync({
    //         iosClientId: '124374796192-fq6ktn0fkltq5n59os1r2u3hk4vaq7ld.apps.googleusercontent.com',
    //         iosStandaloneAppClientId: '124374796192-fq6ktn0fkltq5n59os1r2u3hk4vaq7ld.apps.googleusercontent.com',
    //         scopes: ['profile', 'email']
    //     })
    //     if (result.type == 'success') {
    //         let userData = {
    //             username: result.user.id,
    //             fullName: result.user.name,
    //             password: 'nopassword',
    //             email: result.user.email,
    //             login_type: 'google'
    //         }
    //         store.dispatch(setUserRegisterInfo(userData))
    //         this.props.navigation.navigate('additional')
    //     } else {
    //         alert('Gagal login, cek koneksi anda')
    //     }
    // }

    socialMediaLogin(username) {
        let request = {
            username: username,
            password: 'nopassword'
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
                if (responseJson.status == 'success') {
                    this.setState({ isLoggingIn: false });
                    store.dispatch(setWeek(responseJson.minggu));
                    store.dispatch(setUsername(username));
                    this.props.navigation.dispatch(resetAction(this.props.userType));
                }
            })
    }

    checkUsername(username) {
        let formData = new FormData();
        let request = {
            username: username
        }
        for (let key in request) {
            formData.append(key, request[key]);
        }
        fetch(metrics.BASE_URL+'/cek_username.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status == 'success') {
                this.props.navigation.navigate('additional')
            } else {
                this.socialMediaLogin(username)
            }
        })
    }

    async loginWithFacebook() {
        const self = this
        FBLoginManager.loginWithPermissions(['public_profile'], function(err, data) {
            fetch(`https://graph.facebook.com/me?access_token=${data.credentials.token}`)
                .then((response) => response.json())
                    .then((responseJson) => {
                        let userData = {
                            username: responseJson.id,
                            fullName: responseJson.name,
                            password: 'nopassword',
                            email: '',
                            login_type: 'facebook'
                        }
                        store.dispatch(setUserRegisterInfo(userData))
                        self.checkUsername(responseJson.id)
                    })
        })
    }

    async loginWithGoogle() {
        await GoogleSignIn.configure({
            clientID: IOS_CLIENT_ID,
            scopes: ['email', 'profile'],
            shouldFetchBasicProfile: true,
            language: 'id'
        })

        const user = await GoogleSignIn.signInPromise()

        let userData = {
            username: user.userID,
            fullname: user.name,
            password: 'nopassword',
            email: user.email,
            login_type: 'google'
        }
        store.dispatch(setUserRegisterInfo(userData))
        this.checkUsername(user.userID)
    }

    render() {
        const { navigate, state } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Sehati</Text>
                </View>
                <View style={styles.content}>
                    <View>
                        <CustomButton
                            text='Masuk'
                            buttonStyle={styles.loginButton}
                            textStyle={styles.buttonsText}
                            onPress={() => navigate('login')}
                        />
                        <CustomButton
                            text='Daftar baru'
                            buttonStyle={styles.registerButton}
                            textStyle={[styles.buttonsText, styles.whiteButtonText]}
                            onPress={() => navigate('register')}
                        />
                    </View>
                    <View>
                        <Text style={styles.divider}>A T A U</Text>
                    </View>
                    <View>
                        <CustomButton
                            text='Masuk dengan Facebook'
                            buttonStyle={styles.facebookButton}
                            textStyle={styles.whiteButtonText}
                            onPress={() => this.loginWithFacebook()}
                        />
                        <CustomButton
                            text='Masuk dengan Google'
                            buttonStyle={styles.googleButton}
                            textStyle={styles.whiteButtonText}
                            onPress={() => {this.loginWithGoogle()}}
                        />
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(92, 234, 151)',
        flex: 1,
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

    loginButton: {
        backgroundColor: 'white'
    },

    buttonsText: {
        fontFamily: 'roboto-regular'
    },

    registerButton: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1
    },

    whiteButtonText: {
        color: 'white'
    },

    divider: {
        color: 'white',
        fontFamily: 'roboto-regular',
        marginBottom: 20
    },

    facebookButton: {
        backgroundColor: 'rgb(60,91,151)'
    },

    googleButton: {
        backgroundColor: 'rgb(70,130,234)'
    }
})

const mapStateToProps = (state) => {
    return {
        userType: state.setUserType.userType
    }
}

export default connect(mapStateToProps)(LoginRegister);
