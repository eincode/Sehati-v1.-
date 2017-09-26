import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import store from '../../service/store';
import { setUserType, storeNavigator } from '../../service/action';

import metrics from '../../config/metrics';

class LoginSelection extends Component{

    constructor(){
        super();
        this.state = {
            fontLoaded: false
        }
    }

    componentDidMount(){
        // this.loadAssetsAsync();
        this.setState({ fontLoaded: true })
        store.dispatch(storeNavigator(this.props.navigation));
    }

    // async loadAssetsAsync(){
    //     await Font.loadAsync({
    //         'baloo-regular': require('../../../assets/fonts/Baloo-Regular.ttf'),
    //         'roboto-regular' : require('../../../assets/fonts/Roboto-Regular.ttf')
    //     });
    //     this.setState({fontLoaded: true})
    //     if (Platform.OS == 'ios') {
    //         store.dispatch(setUserType('main'));
    //         this.props.navigation.navigate('loginRegister');
    //     }
    // }

    static navigationOptions = {
        header: null
    }

    loadText(){
        if (this.state.fontLoaded){
            return (
                <View style = {styles.textContainer}>
                    <Text style = {styles.text}>Anda menggunakan</Text>
                    <Text style = {styles.text}>aplikasi Sehati sebagai</Text>
                </View>
            );
        } else {
            return <ActivityIndicator />;
        }
    }

    selectUser(button){
        store.dispatch(setUserType(button));
        this.props.navigation.navigate('loginRegister');
    }

    loadButtons(){
        const { navigate } = this.props.navigation;
        if (this.state.fontLoaded){
            return (
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        text='Ibu mengandung'
                        arrow={true}
                        textStyle = {styles.buttonsText}
                        buttonStyle = {styles.buttons}
                        onPress = {() => this.selectUser('main')}
                    />
                    <CustomButton
                        text='Bidan'
                        arrow={true}
                        textStyle = {styles.buttonsText}
                        buttonStyle = {styles.buttons}
                        onPress = {() => this.selectUser('bidan')}
                    />
                    <CustomButton
                        text='Kader'
                        arrow={true}
                        textStyle = {styles.buttonsText}
                        buttonStyle = {styles.buttons}
                        onPress = {() => this.selectUser('kader')}
                    />
                </View>
            )
        } else {
            return null;
        }
    }

    render(){
        return(
            <View style = {styles.container} >
                {this.loadText()}
                {this.loadButtons()}
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

    textContainer: {
        alignItems: 'center'
    },

    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'baloo-regular'
    },

    buttonsContainer: {
        marginTop: 50
    },

    buttons: {
        backgroundColor: 'white'
    },

    buttonsText: {
        fontFamily: 'roboto-regular'
    }
})

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userType: state.userType
    }
}

export default connect(mapStateToProps)(LoginSelection)