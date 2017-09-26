import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'

import CustomButton from '../../../components/CustomButton'
import metrics from '../../../config/metrics'

class NewMoment extends Component {

    static navigationOptions = {
        title: 'Momen Baru'
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedImage: null,
            message: '',
            imageUri: null
        }
    }

    renderImage() {
        if (this.state.imageUri) {
            return (
                <Image 
                    source={{ uri: this.state.imageUri }}
                    style={{ height: 200, width: 200 }}
                />
            )
        } else {
            return null
        }
    }

    saveMoment() {
        let request = {
            username: this.props.username,
            minggu: this.props.week,
            image: this.state.selectedImage,
            caption: this.state.message
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        fetch(metrics.BASE_URL + '/insert_momen.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success') {
                    DeviceEventEmitter.emit('shouldRefresh', true)
                    this.props.navigation.goBack(null)
                } else {
                    alert('Gagal')
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderImage()}
                <CustomButton
                    text='Pilih Gambar'
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: 'photo',
                            includeBase64: true
                        }).then(image => {
                            this.setState({ selectedImage: image.data, imageUri: image.path })
                            console.log(image.data)
                        });
                    }}
                />
                <TextInput 
                    multiline={true}
                    style={styles.textInput}
                    onChangeText={(value) => this.setState({ message: value })}
                    placeholder={'Tulis pesan disini'}
                    underlineColorAndroid={'transparent'}
                />
                <CustomButton
                    text='Simpan'
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => {
                    this.saveMoment()
                    }}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    button: {
        marginTop: 10,
        backgroundColor: 'rgb(92, 234, 151)'
    },

    buttonText: {
        fontFamily: 'roboto-regular',
        color: 'white'
    },

    textInput: {
        backgroundColor: '#FFFA',
        width: metrics.DEVICE_WIDTH * 0.95,
        borderRadius: 5,
        marginBottom: 10,
        height: 200,
        padding: 5
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.setUsername.username,
        week: state.setWeek.week
    }
}

export default connect(mapStateToProps)(NewMoment)
