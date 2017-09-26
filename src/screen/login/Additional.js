import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';

import store from '../../service/store';
import { setWeek, setUsername } from '../../service/action';
import metrics from '../../config/metrics';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

const resetAction = (routeName) => {
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: routeName, params: { week: 1 } })
        ]
    })
}

class Additional extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate, dispatch } = navigation;
        return {
            title: 'Informasi tambahan'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isRegistering: false,
            isRegisterSuccess: false,
            haidTerakhir: '',
            hamil: '',
            keguguran: '',
            registerMessage: '',
            isCalendarOpened: false,
            selectedDate: ''
        }
    }

    register(){
        this.setState({ isRegistering: true })
        let userData = this.props.userInfo;
        userData.haidTerakhir = this.state.selectedDate;
        userData.hamil = this.state.hamil;
        userData.keguguran = this.state.keguguran;
        let request = {
            username: userData.username,
            nama: userData.fullName,
            email: userData.email,
            password: userData.password,
            haid_terakhir: userData.haidTerakhir,
            keguguran: userData.keguguran,
            hamil: userData.hamil,
            no_hp: userData.phoneNumber,
            login_type: userData.login_type
        }
        console.log(request)
        let formBody = []
        for(let key in request) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&');

        fetch(metrics.BASE_URL+'/insert_user2.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.status == 'success') {
                store.dispatch(setWeek(responseJson.minggu));
                store.dispatch(setUsername(userData.username));
                this.props.navigation.dispatch(resetAction('main'));
            }
        })
    }

    renderRegisterComponent() {
        if (!this.state.isRegistering) {
            if (this.state.isRegisterSuccess) {
                return (
                    <Text>{this.state.registerMessage}</Text>
                )
            } else {
                return (
                    <CustomButton
                        text='Daftar'
                        buttonStyle={styles.buttonStyle}
                        textStyle={styles.buttonText}
                        onPress={() => this.register()}
                    />
                )
            }
        } else {
            return (
                <ActivityIndicator />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>HARI PERTAMA HAID TERAKHIR</Text>
                    <CustomTextInput
                        placeholder={'yyyy-mm-dd'}
                        onFocus={() => this.setState({ isCalendarOpened: true })}
                        value={this.state.selectedDate}
                    />
                    <Text style={styles.inputText}>BERAPA KALI ANDA PERNAH MENGANDUNG SEBELUMNYA?</Text>
                    <CustomTextInput
                        onChangeText={(value) => this.setState({ hamil: value })}
                        keyboardType={'numeric'}
                    />
                    <Text style={styles.inputText}>BERAPA KALI ANDA PERNAH KEGUGURAN SEBELUMNYA?</Text>
                    <CustomTextInput
                        onChangeText={(value) => this.setState({ keguguran: value })}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.staticText}>Anda tidak diwajibkan untuk mengisi data-data di</Text>
                    <Text style={styles.staticText}>atas, namun data-data tersebut diperlukan untuk</Text>
                    <Text style={styles.staticText}>memastikan anda mendapatkan pengalaman</Text>
                    <Text style={styles.staticText}>terbaik saat menggunakan aplikasi Sehati</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.staticText}>Anda juga dapat mengisi data-data tersebut di lain</Text>
                    <Text style={styles.staticText}>waktu melalui halaman Pengaturan</Text>
                </View>
                <View style={styles.textContainer}>
                    {this.renderRegisterComponent()}
                </View>
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

    inputContainer: {
        backgroundColor: 'white'
    },

    inputText: {
        fontFamily: 'roboto-regular',
        fontSize: 12,
        color: 'grey',
        paddingHorizontal: 20,
        paddingTop: 10
    },

    staticText: {
        fontFamily: 'roboto-regular',
        color: 'grey'
    },

    textContainer: {
        marginTop: 20,
        alignItems: 'center'
    },

    buttonStyle: {
        backgroundColor: 'rgb(92, 234, 151)',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
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
        userInfo: state.userRegisterInfo
    }
}

export default connect(mapStateToProps)(Additional);
