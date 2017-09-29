import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, DeviceEventEmitter, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import Camera from 'react-native-camera'

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

    capturePhoto() {
        Alert.alert('Maaf', 'Preview only, mohon untuk menggunakan galeri')
        // this.camera.capture()
        //     .then((data) => {
        //         console.log(data)
        //         this.props.navigation.navigate('newMomentCaption', { selectedImage: data, id: this.props.navigation.state.key })
        //     })
    }


    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                    this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                />
                <View style={{ backgroundColor: 'white', alignItems: 'center', paddingTop: 20, flex: 1, width: metrics.DEVICE_WIDTH }}>
                    <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.capturePhoto() }>
                        <Image source={require('../../../../assets/buttons/capture.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', bottom: 1, height: 50, width: metrics.DEVICE_WIDTH, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                            ImagePicker.openPicker({
                                mediaType: 'photo',
                                includeBase64: true
                            }).then(image => {
                                this.setState({ selectedImage: image.data, imageUri: image.path })
                                this.props.navigation.navigate('newMomentCaption', { image: this.state.imageUri, id: this.props.navigation.state.key, selectedImage: image.data })
                            });
                        }}>
                            <Text>Galeri</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 3, borderColor: metrics.SECONDARY_COLOR }}>
                            <Text style={{ color: metrics.SECONDARY_COLOR }}>Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => Alert.alert('Maaf', 'Video feature coming soon')}>
                            <Text>Video</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    preview: {
        width: metrics.DEVICE_WIDTH,
        height: metrics.DEVICE_HEIGHT * 0.575,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.setUsername.username,
        week: state.setWeek.week
    }
}

export default connect(mapStateToProps)(NewMoment)
