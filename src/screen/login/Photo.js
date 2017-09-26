import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import CustomButton from '../../components/CustomButton';

export default class Photo extends Component{
    static navigationOptions = {
        title: 'Foto KTP dan KIPB'
    }

    state = {
        image: null
    }

    // pickImage = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         aspect: [4,3]
    //     });

    //     console.log(result);

    //     if(!result.canceled){
    //         this.setState({ image: result.uri});
    //     }
    // }

    render(){
        let { image } = this.state;
        const { navigate } = this.props.navigation;
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>Mohon untuk Foto KTP dan KIPB anda</Text>
                <Text style = {styles.text}>dalam satu foto</Text>
                <View style = {styles.imageContainer}>
                    {image &&
                        <Image source={{ uri: image }} style = {styles.image}/>}
                    <CustomButton 
                        text = 'Ambil foto'
                        buttonStyle = {styles.button}
                        textStyle = {styles.buttonText}
                        onPress = {this.pickImage}
                    />
                    <CustomButton 
                        text = 'Upload foto'
                        buttonStyle = {styles.uploadButton}
                        textStyle = {styles.uploadButtonText}
                        onPress = {() => navigate('terms')}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontFamily: 'roboto-regular',
        color: 'grey'
    },

    imageContainer: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center'
    },

    image: {
        width: 280,
        height: 210,
        alignSelf: 'center',
        resizeMode: 'contain'
    },

    button: {
        marginTop: 20,
        backgroundColor: 'rgb(92, 234, 151)'
    },

    buttonText: {
        fontFamily: 'roboto-regular',
        color: 'white'
    },

    uploadButton: {
        backgroundColor: 'white',
        borderColor: 'rgb(92, 234, 151)',
        borderWidth: 1
    },

    uploadButtonText: {
        fontFamily: 'roboto-regular'
    }
})