import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import CustomButton from '../../components/CustomButton';
import PictureListItem from '../../components/PictureListItem';

export default class KaderPatient extends Component {

    static navigationOptions = {
        title: 'Pasien Kader'
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <PictureListItem 
                            name = 'Furihata Ai'
                            detail = {'23 minggu'}
                            image = {require('../../../assets/pictures/furirin.jpg')}
                        />
                        <PictureListItem 
                            name = 'Furihata Ai'
                            detail = {'23 minggu'}
                            image = {require('../../../assets/pictures/furirin.jpg')}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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