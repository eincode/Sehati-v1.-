import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import metrics from '../../config/metrics';

export default class Main extends Component {
    static navigationOptions = {
        title: 'Bidan'
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.master}>
                <TouchableOpacity style={styles.container} onPress = {() => navigate('bidanPatient')}>
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Pasien</Text>
                            <Text style={styles.detail}>27 pasien</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Image source={require('../../../assets/icons/Panah-kanan-abu.png')} style={styles.arrow} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress = {() => navigate('bidanKader')}>
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Kader</Text>
                            <Text style={styles.detail}>27 kader</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Image source={require('../../../assets/icons/Panah-kanan-abu.png')} style={styles.arrow} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    master: {
        flex: 1,
    },

    container: {
        marginTop: 10,
        backgroundColor: 'white'
    },

    itemContainer: {
        height: 70,
        width: metrics.DEVICE_WIDTH,
        flexDirection: 'row',
        borderColor: '#F0F0F0',
        borderBottomWidth: 1
    },

    item: {
        flex: 1,
        justifyContent: 'center'
    },

    textContainer: {
        flex: 15,
        paddingLeft: 20,
        justifyContent: 'center',
    },

    title: {
        fontFamily: 'roboto-regular',
    },

    detail: {
        fontFamily: 'roboto-regular',
        color: 'grey',
    },

    arrowContainer: {
        justifyContent: 'center',
        flex: 1,
        marginRight: 10
    },

    arrow: {
        resizeMode: 'contain',
        width: 50,
        alignSelf: 'flex-end'
    },
})