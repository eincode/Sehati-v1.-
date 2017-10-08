import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Button, Text, ActivityIndicator, TextInput } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';

import store from '../../service/store';
import { setUserRegisterInfo } from '../../service/action';
import metrics from '../../config/metrics';
import CustomTextInput from '../../components/CustomTextInput';

class Register extends Component {

    static navigationOptions = ({ navigation }) => {
        const { navigate, state } = navigation;
        return {
            title: 'Daftar',
            headerRight: (
                <Text style={{ marginRight: 20, color: 'grey' }} onPress={() => navigate('phoneNumber')}>Lanjut</Text>
            )
        }
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isUsernameChecking: false,
            isUsernameAvailable: true,
            isCalendarOpened: false,
            selectedDate: '',
            address: '',
            province: '',
            state: '',
            postal: ''
        }
    }

    checkUsername(){
        this.setState({ isUsernameChecking: true });
        let formBody = []
        let request = {
            username: this.state.username
        }
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')
        fetch(metrics.BASE_URL+'/cek_username.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status == 'success') {
                this.setState({ isUsernameAvailable: true, isUsernameChecking: false })
            } else {
                this.setState({ isUsernameAvailable: false, isUsernameChecking: false })
            }
        })
    }

    getUsernameStatus(){
        if (this.state.isUsernameChecking) {
            return (
                <ActivityIndicator />
            )
        } else {
            if (!this.state.isUsernameAvailable) {
                return (
                    <Text style={{ color: 'red' }}>Username telah diambil, silahkan menggunakan username lain</Text>
                )
            }
        }
    }

    confirmPassword(){
        if (this.state.password != this.state.confirmPassword){
            return (
                <Text style={{ color: 'red' }}>Password tidak sama</Text>
            )
        }
    }

    storeInfo(){
        let userInfo = {
            username: this.state.username,
            fullName: this.state.fullName,
            email: this.state.email,
            password: this.state.password,
            login_type: 'normal',
            birthdate: this.state.selectedDate,
            address: this.state.address,
            province: this.state.province,
            state: this.state.state,
            postal: this.state.postal
        }
        store.dispatch(setUserRegisterInfo(userInfo));
    }

    validateEmail = (email) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(re.test(email))
        return re.test(email);
    }

    getEmailStatus() {
        if (this.state.isValidEmail || this.state.email == '') {
            return null
        } else {
            return (
                <Text style={{ color: 'red' }}>Email anda tidak valid</Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <CustomTextInput
                        placeholder='Username'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ username: value })}
                        onBlur={() => this.checkUsername()}
                    />
                    <View style={styles.divider}>
                        {this.getUsernameStatus()}
                    </View>
                    <CustomTextInput
                        placeholder='Nama lengkap'
                        autoCapitalize='words'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ fullName: value })}
                    />
                    <CustomTextInput
                        placeholder='Tanggal lahir'
                        autoCapitalize='words'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        value={this.state.selectedDate}
                        onFocus={() => this.setState({ isCalendarOpened: true })}
                    />
                    <View style={styles.divider} />
                    <CustomTextInput
                        placeholder='Alamat'
                        autoCapitalize='words'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ address: value })}
                    />
                    <CustomTextInput
                        placeholder='Propinsi'
                        autoCapitalize='words'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ province: value })}
                    />
                    <CustomTextInput
                        placeholder='Kota/Kabupaten'
                        autoCapitalize='words'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ state: value })}
                    />
                    <CustomTextInput
                        keyboardType='numeric'
                        placeholder='Kode pos'
                        autoCapitalize='words'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ postal: value })}
                    />
                    <View style={styles.divider} />
                    <CustomTextInput
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ email: value, isValidEmail: this.validateEmail(value) })}
                    />
                    <View style={styles.divider}>
                        {this.getEmailStatus()}
                    </View>
                    <View style={styles.divider}>
                        {this.confirmPassword()}
                    </View>
                    <CustomTextInput
                        secureTextEntry={true}
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ password: value })}
                    />
                    <CustomTextInput
                        secureTextEntry={true}
                        placeholder='Konfirmasi password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='grey'
                        style={styles.textInput}
                        onChangeText={(value) => this.setState({ confirmPassword: value })}
                        onBlur={() => this.storeInfo()}
                    />
                    <KeyboardSpacer />
                </ScrollView>
                <Modal isVisible={this.state.isCalendarOpened}>
                    <View style={styles.modal}>
                        <View style={{ flexDirection: 'row', marginBottom:10 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <TextInput
                                    placeholder={'Lompat ke tahun...'}
                                    onChangeText={(value) => this.setState({ editYear: value })}
                                />
                            </View>
                            <View>
                                <Button
                                    title={'Lompat'}
                                    onPress={() => this.setState({ currentYear: this.state.editYear })}
                                />
                            </View>
                        </View>
                        <Calendar
                            current={this.state.currentYear || `${new Date()}`}
                            onDayPress={(day) => {
                                this.setState({ selectedDate: day.dateString, isCalendarOpened: false })
                            }}
                        />
                    </View>
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    textInput: {
        backgroundColor: 'white'
    },

    divider: {
        minHeight: 10,
        padding: 10,
        paddingLeft: 20,
    },

    modal: {
		alignSelf: 'center',
		width: metrics.DEVICE_WIDTH*0.8,
		backgroundColor: 'white',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
        height: 400
	}
})

const mapStateToProps = (state) => {
    return {
        userType: state.setUserType.userType
    }
}

export default connect(mapStateToProps)(Register);
