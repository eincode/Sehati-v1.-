import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import metrics from '../config/metrics';

const arrow = require('../../assets/icons/Panah-kanan-abu.png');

export default class TodayList extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func
    }

    getText() {
        switch (this.props.text) {
            case '1' : {
                return (
                    <View style={{ flexDirection: 'row', flex: 5 }}>
                        <Text style = {styles.text}>Isi </Text>
                        <Text style = {[styles.text, { color: metrics.SECONDARY_COLOR }]}>Jurnal </Text>
                        <Text style = {styles.text}>untuk minggu ini</Text>
                    </View>
                )
            }
            case '2' : {
                return (
                    <View style={{ flexDirection: 'row', flex: 5 }}>
                        <Text style = {styles.text}>Lihat </Text>
                        <Text style = {[styles.text, { color: metrics.SECONDARY_COLOR }]}>Jadwal </Text>
                        <Text style = {styles.text}>minggu ini</Text>
                    </View>
                )
            }
            case '3' : {
                return (
                    <View style={{ flexDirection: 'row', flex: 5 }}>
                        <Text style = {styles.text}>Baca </Text>
                        <Text style = {[styles.text, { color: metrics.SECONDARY_COLOR }]}>Tips Kehamilan </Text>
                        <Text style = {styles.text}>minggu ini</Text>
                    </View>
                )
            }
        }
    }

    render(){
        const { text, onPress } = this.props;
        return(
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                {this.getText()}
                <Image style = {styles.arrow} source = {arrow}/>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginBottom: 5,
        width: metrics.DEVICE_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },

    arrow: {
        flex: 1,
        resizeMode: 'contain'
    }
})
