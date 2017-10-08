import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';

import HeaderButton from '../../components/HeaderButton';
import ListButton from '../../components/ListButton';
import CustomButton from '../../components/CustomButton';
import metrics from '../../config/metrics';
import store from '../../service/store'
import { setWeek } from '../../service/action'

const backAction = NavigationActions.back();

class Settings extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Pengaturan',
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isBirthdateCalendarOpened: false,
            isLastHaidCalendarOpened: false,
            birthdate: '',
            lastHaid: '',
            isLoading: true,
            profileData: null,
            fullname: '',
            address: '',
            province: '',
            state: '',
            postal: '',
            email: ''
        }
    }

    componentDidMount() {
        let request = {
            username: this.props.username
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')
        fetch(metrics.BASE_URL + '/get_profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    profileData: responseJson, 
                    isLoading: false, 
                    birthdate: responseJson.ttl, 
                    lastHaid: responseJson.haid_terakhir,
                    fullname: responseJson.nama,
                    address: responseJson.alamat,
                    province: responseJson.propinsi,
                    postal: responseJson.kode_pos,
                    email: responseJson.email,
                    state: responseJson.kabupaten
                 })
            })
    }

    resetData() {
        const self = this
        let request = {
            username: this.props.username
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')
        fetch(metrics.BASE_URL + '/reset.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success') {
                    self.props.navigation.goBack(null)
                } else {
                    Alert.alert('Error', 'Ada yang salah')
                }
            })
    }

    renderContent() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <ScrollView style={styles.container} contentContainerStyle={styles.contentStyle}>
                    <CustomButton
                        text='Si kecil telah lahir'
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => {
                            Alert.alert('Perhatian', 'Apakah anda yakin?', [{
                                text: 'Iya', onPress: () => this.resetData()
                            }, {
                                text: 'Tidak'
                            }], {
                                cancelable: false
                            })
                        }}
                    />
                    <HeaderButton
                        header='Nama Lengkap'
                        initialValue={this.state.profileData.nama}
                        onChangeText={(value) => this.setState({ fullname: value })}
                    />
                    <HeaderButton
                        header='Tanggal Lahir'
                        onFocus={() => this.setState({ isBirthdateCalendarOpened: true })}
                        initialValue={this.state.birthdate}
                    />
                    <View style={styles.divider} />
                    <HeaderButton
                        header='Alamat'
                        initialValue={this.state.profileData.alamat}
                        onChangeText={(value) => this.setState({ address: value })}                        
                    />
                    <HeaderButton
                        header='Propinsi'
                        initialValue={this.state.profileData.propinsi}
                        onChangeText={(value) => this.setState({ province: value })}                        
                    />
                    <HeaderButton
                        header='Kota / Kabupaten'
                        initialValue={this.state.profileData.kabupaten}
                        onChangeText={(value) => this.setState({ state: value })}                        
                    />
                    <HeaderButton
                        header='Kode pos'
                        keyboardType={'numeric'}
                        initialValue={this.state.profileData.kode_pos}
                        onChangeText={(value) => this.setState({ postal: value })}                        
                    />
                    <View style={styles.divider} />
                    <HeaderButton
                        header='Email'
                        keyboardType={'email-address'}
                        initialValue={this.state.profileData.email}
                        onChangeText={(value) => this.setState({ email: value })}                        
                    />
                    <View style={styles.divider} />
                    <HeaderButton
                        header='Hari pertama haid terakhir'
                        onFocus={() => this.setState({ isLastHaidCalendarOpened: true })}                        
                        initialValue={this.state.lastHaid}
                    />
                    <View style={styles.divider} />
                    <View style={styles.divider} />
                    <CustomButton
                        text='Simpan'
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => this.saveData()}
                    />
                    <KeyboardSpacer />
            </ScrollView>
            )
        }
    }

    saveData() {
        const self = this
        let request = {
            username: this.props.username,
            nama: this.state.fullname,
            tanggal_lahir: this.state.birthdate,
            alamat: this.state.address,
            propinsi: this.state.province,
            kabupaten: this.state.state,
            kode_pos: this.state.postal,
            email: this.state.email,
            haid_terakhir: this.state.lastHaid
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        fetch(metrics.BASE_URL+'/edit_profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success'){
                    let request = {
                        username: self.props.username
                    }
                    let formBody = []
                    for (let key in request) {
                        let encodedKey = encodeURIComponent(key)
                        let encodedValue = encodeURIComponent(request[key])
                        formBody.push(encodedKey + '=' + encodedValue)
                    }
                    formBody = formBody.join('&')

                    fetch(metrics.BASE_URL + '/get_minggu.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-forl-urlencoded'
                        },
                        body: formBody
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            store.dispatch(setWeek(responseJson.minggu))
                            this.props.navigation.goBack(null)
                        })
                } else {
                    alert('Gagal')
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
                <Modal isVisible={this.state.isBirthdateCalendarOpened}>
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
                                this.setState({ birthdate: day.dateString, isBirthdateCalendarOpened: false })
                            }}
                        />
                    </View>
                </Modal>
                <Modal isVisible={this.state.isLastHaidCalendarOpened}>
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
                            this.setState({ lastHaid: day.dateString, isLastHaidCalendarOpened: false })
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
        flex: 1,
    },

    contentStyle: {
        alignItems: 'center'
    },

    divider: {
        height: 10
    },

    button: {
        marginTop: 20,
        backgroundColor: 'rgb(92, 234, 151)'
    },

    buttonText: {
        fontFamily: 'roboto-regular',
        color: 'white'
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
        userData: state.userRegisterInfo,
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(Settings)
