import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

import metrics from '../config/metrics';

export default class PictureButton extends Component{
    static propTypes = {
        picture: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        onButtonPressed: PropTypes.func,
        style: PropTypes.any
    }

    render(){
        const { picture, text, onButtonPressed, style, ...otherProps } = this.props;
        return(
            <TouchableOpacity onPress = {onButtonPressed} style = {[styles.button, style]}>
                <Image source = {picture} style = {styles.picture}>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.text}>{text}</Text>
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'roboto-regular',
        marginBottom: 10,
        marginLeft: 5
    },

    textContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0)'
    },

    picture: {
        resizeMode: 'contain',
        width: metrics.DEVICE_WIDTH * 0.35,
        height: metrics.DEVICE_WIDTH * 0.35
    },

    button: {
        width: metrics.DEVICE_WIDTH * 0.35,
        height: metrics.DEVICE_WIDTH * 0.35
    }
})
