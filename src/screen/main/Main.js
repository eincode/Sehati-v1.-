import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Text, Platform, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';

import store from '../../service/store'
import { setUsername, storeNavigator, setWeek } from '../../service/action'

import MainLeftHeaders from '../../components/MainLeftHeaders';
import MenuButton from '../../components/MenuButton';

import metrics from '../../config/metrics'

import Today from './Today';
import Journal from './Journal';
import Schedule from './Schedule';
import Etc from './Etc';

const App = TabNavigator({
    today: {screen: Today},
    schedule: {screen: Schedule},
    journal: {screen: Journal},
    etc: {screen: Etc}
},  {
    tabBarOptions: {
        activeTintColor: 'rgb(92, 234, 151)',
        style: {
            backgroundColor: 'white',
        },
        inactiveTintColor: 'grey',
        pressColor: 'grey',
        showIcon: true,
        indicatorStyle: {
            backgroundColor: 'rgb(92, 234, 151)'
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
});

class Main extends Component{
    static navigationOptions = (props) => {
        return {
            title: 'Sehati',
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                marginRight: Platform.OS == 'android' ? 26 : 15
            },
            headerLeft: (
                <MainLeftHeaders
                    navigation = {props.navigation}
                />
            ),

            headerRight: (
                <MenuButton />
            ),

            headerStyle: {
                elevation: 0
            }
        }
    }

    checkProfileData(username) {
        const self = this
        let request = {
            username: username
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')
        fetch(metrics.BASE_URL + '/get_profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.alamat == null) {
                    Alert.alert('Perhatian', 'Mohon untuk melengkapi profil anda di bagian pengaturan', [{
                        text: 'OK', onPress: () => self.props.rootNav.navigate('settings')
                    }], {
                        cancelable: false
                    })
                }
            })
    }

    getWeek(username) {
        const self = this
        let request = {
            username: username
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')
        fetch(metrics.BASE_URL + '/get_minggu.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                store.dispatch(setWeek(responseJson.minggu))
            })
    }

    componentDidMount() {
        const self = this
        if (this.props.username) {
            AsyncStorage.setItem('username', this.props.username)
            AsyncStorage.setItem('login', 'true')
            this.checkProfileData(this.props.username)   
            this.getWeek(this.props.username)         
            if (this.props.userData) {
                AsyncStorage.setItem('userData', JSON.stringify(this.props.userData))
            }
        } else {
            AsyncStorage.getItem('username', (err, result) => {
                store.dispatch(setUsername(result))
                this.checkProfileData(result)
                this.getWeek(result)
        
            })
        }
        store.dispatch(storeNavigator(this.props.navigation))
    }

    render(){
        return(
            <App />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rootNav: state.storeNavigator.navigator,
        week: state.setWeek.week,
        username: state.setUsername.username,
        userData: state.userRegisterInfo
    }
}

export default connect(mapStateToProps)(Main);
