import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';

export default class NewPasswordInput extends Component{

    static navigationOptions = ({navigation}) => {
        const { navigate } = navigation;
        return{
            title: 'Perbarui kata sandi ',
            headerRight: (
                <Text style = {{marginRight: 20, color: 'grey'}} onPress={() => navigate('passwordChanged')}>Lanjut</Text>
            )
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <CustomTextInput
                    placeholder = 'Kata sandi baru'
                    secureTextEntry = {true}
                    style = {styles.input}
                />
                <CustomTextInput
                    placeholder = 'Konfirmasi kata sandi'
                    secureTextEntry = {true}
                    style = {styles.input}
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
        backgroundColor: 'white'
    }
})