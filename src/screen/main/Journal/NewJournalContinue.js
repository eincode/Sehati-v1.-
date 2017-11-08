import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import PropTypes from 'prop-types';

import CustomTextInput from '../../../components/CustomTextInput';
import metrics from '../../../config/metrics';
import CustomButton from '../../../components/CustomButton';

class TextInputItem extends Component {

    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }

    render() {
        const { placeholder, label, onChange } = this.props;
        return (
            <View style={styles.itemContainer}>
                <View style={styles.textInputContainer}>
                    <CustomTextInput
                        placeholder={placeholder}
                        keyboardType='numeric'
                        onChangeText={onChange}
                        onBlur={() => Keyboard.dismiss}
                    />
                </View>
                <View style={styles.labelContainer}>
                    <Text>{label}</Text>
                </View>
            </View>
        )
    }

}

const resetAction = () => {
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'main' })
        ]
    })
}

class NewJournalContinue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tinggiBadanValue: '',
            beratBadanValue: '',
            denyutNadiValue: '',
            tekananDarahValue: '',
            suhuTubuhValue: '',
            pernapasanValue: '',
            lingkarLenganAtasValue: '',
            isLoading: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { navigate, dispatch } = navigation;
        return{
            title: 'Jurnal baru '
        }
    }

    renderLoading(){
        if (this.state.isLoading){
            return (
                <ActivityIndicator />
            )
        }
    }

    sendData(){
        if (this.state.beratBadanValue == '' || this.state.denyutNadiValue == '' || this.state.tekananDarahValue == '' || this.state.suhuTubuhValue == '' || this.state.pernapasanValue == '' || this.state.lingkarLenganAtasValue == ''){
            Alert.alert('Gagal', 'Mohon untuk melengkapi data sebelum melanjutkan')
        } else {
            this.setState({ isLoading: true });
            let request = {
                username: this.props.username,
                status: 'kehamilanku',
                tinggi_tubuh_kehamilan: this.state.tinggiBadanValue,
                berat_tubuh_kehamilan: this.state.beratBadanValue,
                denyut_jantung_kehamilan: this.state.denyutNadiValue,
                tekanan_darah_kehamilan: this.state.tekananDarahValue,
                suhu_tubuh_kehamilan: this.state.suhuTubuhValue,
                pernapasan_kehamilan: this.state.pernapasanValue,
                lingkar_lengan_kehamilan: this.state.lingkarLenganAtasValue
            }
            let formBody = []
            for (let key in request){
                let encodedKey = encodeURIComponent(key)
                let encodedValue = encodeURIComponent(request[key])
                formBody.push(encodedKey + '=' + encodedValue)
            }
            formBody = formBody.join('&')
            fetch(metrics.BASE_URL + '/insert_jurnal.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status == 'success') {
                        this.setState({ isLoading: false });
                        this.props.navigation.dispatch(resetAction());
                    } else {
                        this.setState({ isLoading: false, isError: true });
                    }
                })
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInputItem
                    placeholder='Berat Badan'
                    label='kg'
                    onChange={(value) => this.setState({ beratBadanValue: value })}
                />
                <TextInputItem
                    placeholder='Denyut Nadi'
                    label='dpm'
                    onChange={(value) => this.setState({ denyutNadiValue: value })}
                />
                <TextInputItem
                    placeholder='Tekanan Darah'
                    label='mmHg'
                    onChange={(value) => this.setState({ tekananDarahValue: value })}
                />
                <TextInputItem
                    placeholder='Suhu Tubuh'
                    label='°C'
                    onChange={(value) => this.setState({ suhuTubuhValue: value })}
                />
                <TextInputItem
                    placeholder='Pernapasan'
                    label='nafas / menit'
                    onChange={(value) => this.setState({ pernapasanValue: value })}
                />
                <TextInputItem
                    placeholder='Lingkar Lengan Atas'
                    label='cm'
                    onChange={(value) => this.setState({ lingkarLenganAtasValue: value })}
                />
                {this.renderLoading()}
                <View style = {{ alignItems: 'center', marginTop: 10 }}>
                    <CustomButton
                        text={this.state.isError ? 'Terjadi kesalahan' : 'Simpan'}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => this.sendData()}
                    />
                </View>
                <KeyboardSpacer />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingRight: 10,
        marginBottom: 5
    },

    textInputContainer: {
        flex: 10
    },

    labelContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    button: {
        backgroundColor: 'rgb(92, 234, 151)',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    }
})

const mapStateToProps = (state) => {
    return{
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(NewJournalContinue);
