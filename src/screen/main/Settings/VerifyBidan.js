import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import CustomButton from '../../../components/CustomButton';

const backAction = NavigationActions.back();

export default class VerifyBidan extends Component {

    static navigationOptions = {
        title: 'Verifikasi bidan'
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>Apakah bidan anda</Text>
                <Text style = {styles.text}>Titi Kamal?</Text>
                <CustomButton 
                    text = {'Ya'}
                    buttonStyle = {styles.confirmButton}
                    textStyle = {styles.buttonText}
                    onPress = {() => this.props.navigation.dispatch(backAction)}
                />
                <CustomButton 
                    text = {'Bukan'}
                    buttonStyle = {styles.rejectButton}
                    textStyle = {styles.buttonText}
                    onPress = {() => this.props.navigation.dispatch(backAction)}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'roboto-regular'
    },

    confirmButton: {
        marginTop: 20,
        backgroundColor: 'rgb(92, 234, 151)'
    },

    rejectButton: {
        backgroundColor: 'rgb(255,158,169)'
    },

    buttonText: {
        fontFamily: 'roboto-regular',
        color: 'white'
    },
})