import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';

import ListButton from '../../components/ListButton';

export default class About extends Component {

    static navigationOptions = {
        title: 'Tentang Sehati'
    }

    render(){
        return(
            <View style = {styles.container}>
                <ListButton
                    text = 'Like us on Facebook'
                    arrow = {true}
                    onPress = {() => Linking.openURL('https://www.facebook.com/sehatikehamilan/')}
                />
                <ListButton
                    text = 'Follow us on Instagram'
                    arrow = {true}
                    onPress = {() => Linking.openURL('https://www.instagram.com/sehatikehamilan/')}
                />
                <View style = {styles.divider}/>
                <ListButton
                    text = 'Kebijakan dan Privasi'
                    arrow = {true}
                    onPress = {() => this.props.navigation.navigate('kebijakan')}
                />
                <ListButton
                    text = 'Syarat dan Ketentuan'
                    arrow = {true}
                    onPress = {() => this.props.navigation.navigate('syarat')}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    divider: {
        height: 20
    }
})
