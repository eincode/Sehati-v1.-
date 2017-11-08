import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import metrics from '../../config/metrics';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

export default class ForgetPasswordEmail extends Component{

    static navigationOptions = ({navigation}) => {
        const { navigate } = navigation;
        return{
            title: 'Lupa kata sandi '
        }
    }

    sendForgetPassword(){
        let request = {
            email: this.state.email
        }
        let formBody = [];
        for(let key in request){
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&');
        
        fetch('http://sehati-project.net/index.php/sehati/sendMail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
        .then((responseJson) => {

        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <CustomTextInput 
                    placeholder = 'Alamat email yang terdaftar'
                    keyboardType = 'email-address'
                    style = {styles.input}
                    onChangeText={(value) => this.setState({ email: value })}
                />
                <Text style = {styles.text}>Kami akan mengirimkan tautan ke alamat email</Text>
                <Text style = {styles.text}>Anda untuk mengatur ulang kata sandi Anda</Text>
                <CustomButton 
                    text='Kirim'
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.buttonText}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    input: {
        backgroundColor: 'white',
        marginBottom: 20
    },

    text: {
        color: 'grey',
        fontFamily: 'roboto-regular',
        alignSelf: 'center',
        paddingHorizontal: 20
    },

    buttonStyle: {
        backgroundColor: 'rgb(92, 234, 151)',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    }
})