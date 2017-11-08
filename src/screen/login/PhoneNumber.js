import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import store from '../../service/store';
import { setUserRegisterInfo } from '../../service/action';
import CustomTextInput from '../../components/CustomTextInput';
import HeaderRight from '../../components/HeaderRight'

class PhoneNumber extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate, state } = navigation;
        return {
            title: 'Nomor ponsel ',
            headerRight: (
                <HeaderRight 
                    navigation = {navigation}
                />
            )
        }
    }

    storeInfo(){
        let userInfo = this.props.userInfo;
        userInfo.phoneNumber = this.state.phoneNumber;
        store.dispatch(setUserRegisterInfo(userInfo));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.numberStyle}>
                        <Text>+62</Text>
                    </View>
                    <View style={styles.inputStyle}>
                        <CustomTextInput
                            keyboardType='numeric'
                            placeholder='Nomor ponsel'
                            onChangeText={(value) => this.setState({ phoneNumber: value })}
                            onBlur={() => this.storeInfo()}
                        />
                    </View>
                </View>
                <View style={styles.staticText}>
                    <Text style={styles.texts}>Kami akan mengirimkan sebuah kode verifikasi</Text>
                    <Text style={styles.texts}>ke nomor ponsel Anda</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },

    numberStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10
    },

    inputStyle: {
        flex: 7
    },

    staticText: {
        marginTop: 30,
        alignItems: 'center'
    },

    texts: {
        fontFamily: 'roboto-regular',
        color: 'grey'
    }
})

const mapStateToProps = (state) => {
    return{
        userInfo: state.userRegisterInfo
    }
}

export default connect(mapStateToProps)(PhoneNumber);