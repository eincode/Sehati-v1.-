import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import CustomButton from '../../components/CustomButton';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'loginRegister' })
    ]
})

export default class PasswordChanged extends Component{

    static navigationOptions = {
        title: 'Perbarui kata sandi '
    }

    

    render(){
        const { dispatch } = this.props.navigation;
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>Kata sandi Anda telah diperbarui</Text>
                <CustomButton 
                    text = 'Kembali ke halaman Masuk'
                    buttonStyle = {styles.button}
                    textStyle = {styles.buttonText}
                    onPress = {() => dispatch(resetAction)}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        color: 'grey',
        fontFamily: 'roboto-regular',
        fontSize: 15,
        marginBottom: 30
    },

    button: {
        backgroundColor: 'rgb(92, 234, 151)'
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    }
})