import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomButton from '../../components/CustomButton';

export default class ForgetPasswordInbox extends Component{

    static navigationOptions = ({navigation}) => {
        const { navigate } = navigation;
        return{
            title: 'Lupa kata sandi',
            headerRight: (
                <Text style = {{marginRight: 20, color: 'grey'}} onPress={() => navigate('newPasswordInput')}>Lanjut</Text>
            )
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {[styles.text, styles.title]}>Harap periksa inbox email Anda</Text>
                <Text style = {styles.text}>Kami telah mengirimkan tautan ke alamat email</Text>
                <Text style = {styles.text}>Anda untuk mengatur ulang kata sandi Anda</Text>
                <View style = {styles.buttonsContainer}>
                    <CustomButton 
                        text = 'Baik'
                        buttonStyle = {styles.continueButton}
                        textStyle = {styles.continueButtonText}
                    />
                    <CustomButton
                        text = 'Kirim kembali'
                        buttonStyle = {styles.resendButton}
                        textStyle = {styles.resendButtonText}
                    />
                </View>
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
        fontFamily: 'roboto-regular'
    },

    title: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },

    buttonsContainer: {
        marginTop: 20
    },

    continueButton: {
        backgroundColor: 'rgb(92, 234, 151)'
    },

    continueButtonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    },

    resendButton: {
        backgroundColor: 'transparent',
        borderColor: 'rgb(92, 234, 151)',
        borderWidth: 1
    },

    resendButtonText: {
        fontFamily: 'roboto-regular'
    }
})