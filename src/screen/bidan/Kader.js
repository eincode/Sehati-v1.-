import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import CustomButton from '../../components/CustomButton';
import PictureListItem from '../../components/PictureListItem';

export default class Kader extends Component {

    static navigationOptions = {
        title: 'Kader'
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <CustomButton
                    text='Daftar kader baru'
                    textStyle={styles.buttonText}
                    buttonStyle={styles.button}
                    onPress = {() => navigate('register', {userType: 'kader'})}
                />
                <View>
                    <ScrollView>
                        <PictureListItem 
                            name = 'Furihata Ai'
                            detail = {'23 pasien'}
                            image = {require('../../../assets/pictures/furirin.jpg')}
                            onPress = {() => navigate('pasienKader')}

                        />
                        <PictureListItem 
                            name = 'Furihata Ai'
                            detail = {'23 pasien'}
                            image = {require('../../../assets/pictures/furirin.jpg')}
                            onPress = {() => navigate('pasienKader')}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        marginTop: 20,
        backgroundColor: 'rgb(92, 234, 151)'
    },

    buttonText: {
        fontFamily: 'roboto-regular',
        color: 'white'
    }
})