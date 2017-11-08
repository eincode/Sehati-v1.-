import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import HeaderRight from '../../components/HeaderRight';

class Verification extends Component{

    static navigationOptions = (props) => {
        const { navigate, state } = props.navigation;
        return{
            title: 'Verifikasi ',
            headerRight: (
                <HeaderRight 
                    navigation = {props.navigation}
                />
            )
        }
    }

    next(){
        console.log(this.props)
    }

    render(){
        return(
            <View style = {styles.container}>
                <CustomTextInput
                    placeholder = 'Kode verifikasi'
                    keyboardType = 'numeric'
                    style = {styles.input}
                />
                <View style = {styles.staticText}>
                    <Text style = {styles.texts}>Masukkan kode verifikasi 6 angka yang telah</Text>
                    <Text style = {styles.texts}>dikirimkan ke ponsel Anda.</Text>
                </View>
                <View style = {styles.staticText}>
                    <Text style = {styles.texts}>Jika Anda tidak menerima kode verifikasi, silakan</Text>
                    <Text style = {styles.texts}>tekan tombol 'Kirim kembali' di bawah ini.</Text>
                </View>
                <View style = {styles.staticText}>
                    <CustomButton
                        text = 'Kirim kembali'
                        buttonStyle = {styles.buttonStyle}
                        textStyle = {styles.buttonText}
                    />
                </View>
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
    },

    staticText: {
        marginTop: 30,
        alignItems: 'center'
    },

    texts: {
        fontFamily: 'roboto-regular',
        color: 'grey'
    },

    buttonStyle: {
        backgroundColor: 'rgb(92, 234, 151)',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    }
})

const mapStateToProps = (state) => {
    return{
        userType: state.setUserType.userType
    }
}

export default connect(mapStateToProps)(Verification);